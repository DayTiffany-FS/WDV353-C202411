const Locations = require("../models/Locations");

const getAllLocations = async (req,res) => {
    try {
        const locations = await Locations.find({});
        res.status(200).json({
            data: locations,
            success: true, 
            message: `${req.method} - request to Location endpoint`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `${req.method} - failed to hit location endpoint`,
            error: error.message
        });
    }
};

const getLocationById = async (req,res) => {
    try {
        const {id} = req.params;
        const location = await Locations.findById(id);

        if (!location) {
            return res.status(404).json({
                success: false,
                message: `The location with id ${id} was not listed in this directory`,
            });
        }

        res.status(200).json({
            data: location,
            success: true, 
            message: `${req.method} - request to Location endpoint1`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `${req.method} unable to determine your desired location`,
            error: error.message
        })
    }
};

const createLocation = async (req,res) => {
    const {location} = req.body;
    try {
        const newLocation = await Locations.create(location);
        console.log("data >>>", newLocation);
        res.status(200).json({
            data: newLocation,
            success: true,
            message: `${req.method} - request to Location endpoint2`,
        });
    } catch (error) {
        if (error.name == "ValidationError") {
            console.error("Error Validating!", error);
            res.status(422).json(error);
        } else {
            console.error(error);
            res.status(500).json(error);
        }
    };
};

const updateLocation = async (req,res) => {
    try {
        const {id} = req.params;
        const {city} = req.body;

        const updateLocation = await Locations.findByIdAndUpdate(
            id,
            {city},
            {new: true}
        );

        if (!updateLocation) {
            return res.status(404).json({
                success: false,
                message: `Location with id ${id} is not listed within this directory`,
            });
        }

        res.status(200).json({
            data: updateLocation,
            success: true, 
            message: `${req.method} - request to Location endpoint3`,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Cannot update location information`,
            error: error.message,
        });
    }
};

const deleteLocation = async (req,res) => {
    try {
        const {id} = req.params;
        const deleteLocation = await Locations.findByIdAndDelete(id);

        if (!deleteLocation) {
            return res.status(404).json({
                success: false,
                message: `Location with id ${id} is not listed in this directory`,
            });
        }

        res.status(200).json({
            data: location,
            success: true, 
            message: `${req.method} - request to Location endpoint4`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `This location could not be removed`,
            error: error.message,
        })
    }
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
};