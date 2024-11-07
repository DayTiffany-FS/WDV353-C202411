const getAllBands = (req,res) => {
    res.status(200).json({
        success: true, 
        message: `${req.method} - request to Band endpoint`,
    });
};

const getBandById = (req,res) => {
    const {id} = req.params;
    res.status(200).json({
        id,
        success: true, 
        message: `${req.method} - request to Band endpoint1`,
    });
};

const createBand = (req,res) => {
    res.status(200).json({
        success: true, 
        message: `${req.method} - request to Band endpoint2`,
    });
};

const updateBand = (req,res) => {
    const {id} = req.params;
    res.status(200).json({
        id,
        success: true, 
        message: `${req.method} - request to Band endpoint3`,
    });
};

const deleteBand = (req,res) => {
    const {id} = req.params;
    res.status(200).json({
        id,
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