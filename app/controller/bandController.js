const Bands = require("../models/Bands");

const getAllBands = async (req,res) => {
    const bands = await Bands.find({});
    res.status(200).json({
        data: bands,
        success: true, 
        message: `${req.method} - request to Band endpoint`,
    });
};

const getBandById = async (req,res) => {
    const {id} = req.params;
    const bands = await Bands.findById(id);
    res.status(200).json({
        data: bands,
        success: true, 
        message: `${req.method} - request to Band endpoint1`,
    });
};

const createBand = async (req,res) => {
    const { band } = req.body;
    const newBand = await Bands.create(band);
    console.log("data >>>", newBand);
    res.status(200).json({
        success: true, 
        message: `${req.method} - request to Band endpoint2`,
    });
};

const updateBand = async (req,res) => {
    const {id} = req.params;
    const band = await Bands.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json({
        data: band,
        success: true, 
        message: `${req.method} - request to Band endpoint3`,
    });
};

const deleteBand = async (req,res) => {
    const {id} = req.params;
    const band = await Bands.findByIdAndDelete(id);
    res.status(200).json({
        data: band,
        success: true, 
        message: `${req.method} - request to Band endpoint4`,
    });
};

module.exports = {
    getAllBands, 
    getBandById, 
    createBand, 
    updateBand, 
    deleteBand
}