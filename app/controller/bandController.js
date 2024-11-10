const Bands = require("../models/Bands");

const getAllBands = async (req,res) => {
    try {
        const bands = await Bands.find({});
        res.status(200).json({
            data: bands,
            success: true, 
            message: `${req.method} - request to Band endpoint`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Unable to list locations, find a map`,
            error: error.message,
        });
    }
};

const getBandById = async (req,res) => {
    try {
        const {id} = req.params;
        const bands = await Bands.findById(id);

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
    const {band} = req.body;
    try {
        const newBand = await Bands.create(band);
        console.log("data >>>", newBand);
        res.status(200).json({
            data: newBand,
            success: true,
            message: `${req.method} - request to Band endpoint2`,
        });
    } catch (error) {
        if (error.name == "ValidationError") {
            console.error("Error Validating!", error);
            res.status(422).json(error);
        } else {
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const updateBand = async (req,res) => {
    try {
        const {id} = req.params;
        const updateBand = await Bands.findByIdAndUpdate(
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
        const deleteBand = await Bands.findByIdAndDelete(id);

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