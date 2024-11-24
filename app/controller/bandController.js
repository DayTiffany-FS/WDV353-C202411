const Band = require("../models/Band");
const Location = require("../models/Locations");
const messages = require("../messages/Messages");


const getAllBands = async (req,res) => {
    try {
        const {minFee_gt, minFee_lt, genre, sortBy, sortOrder = "asc", page =1, limit = 5, fields} = req.query;

        const filter = {};
        if (minFee_gt) filter.minFee = {$gt: Number(minFee_gt)};
        if (minFee_lt) {
            if (!filter.minFee) filter.minFee = {};
            filter.minFee.$lt = Number(minFee_lt);
        }

        if (genre) filter.genre = {$regex: genre, $options: "i"};

        const skip = (page -1) * limit;
        const sort = sortBy ? {[sortBy]: sortOrder==="desc" ? -1:1}: {};

        const selectFields = fields ? fields.split(',').join(' ') : '-__v -_id -location';

        const bands = await Band.find(filter)
        .populate("location")
        .select(selectFields)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));

        const totalBands = await Band.countDocuments(filter);
        
        res.status(200).json({
            data: bands,
            success: true, 
            total: totalBands,
            pages: Math.ceil(totalBands / limit),
            currentPage: Number(page),
            message: `${req.method} - request to Band endpoint`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Unable to list bands, hello darkness my old friend`,
            error: error.message,
        });
    }
};

const getBandById = async (req,res) => {
    try {
        const {id} = req.params;
        const bands = await Band.findById(id);

        if (!bands) {
            return res.status(404).json({
                success: false,
                message: `Band with id ${id} could not be heard`,
            });
        }
        res.status(200).json({
            data: bands,
            success: true, 
            message: `${req.method} - request to Band endpoint1`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Unable to plug in, band unavailable for feedback`,
            error: error.message
        });
    }
};

const createBand = async (req,res) => {
    const { name, locationName, genre, minFee } = req.body;
    try {
        let location = await Location.findOne({location: locationName});

        if (!location){
            location = new Location({location: locationName});
            await location.save();
        }

        const newBand = new Band({
            name, 
            genre, 
            location: location._id, 
            minFee});
        await newBand.save();

        res.status(201).json({
            success: true,
            message: messages.bandCreated,
            data: newBand,
        });
    } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create band",
                error: error.message,
            });
        }
};

const updateBand = async (req,res) => {
    try {
        const {id} = req.params;
        const updateBand = await Band.findByIdAndUpdate(
            id, 
            req.body, 
            {new: true});

        if (!updateBand) {
            return res.status(404).json({
                success: false,
                message: `Band with id ${id} does not exist`,
            });
        }

        res.status(200).json({
            data: updateBand,
            success: true, 
            message: `${req.method} - request to Band endpoint3`,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error updating band information`,
            error: error.message,
        });
    }
};

const deleteBand = async (req,res) => {
    try {
        const {id} = req.params;
        const deleteBand = await Band.findByIdAndDelete(id);

        if (!deleteBand) {
            return res.status(404).json({
                success: false,
                message: `Band with id ${id} not listed`,
            });
        }

        res.status(200).json({
            data: deleteBand,
            success: true, 
            message: `${req.method} - request to Band endpoint4`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Unable to delete this band from the directory`,
            error: error.message,
        });
    }
};

module.exports = {
    getAllBands, 
    getBandById, 
    createBand, 
    updateBand, 
    deleteBand
}