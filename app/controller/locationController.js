const Location = require("../models/Locations");
const Band = require("../models/Band");
const messages = require("../messages/Messages");

const getAllLocations = async (req,res) => {
    try {
        const locations = await Location.find({});
        
        res.status(200).json({
            data: locations,
            success: true, 
            message: `Request to get all locations successful`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to retrieve all locations`,
            error: error.message
        });
    }
};

const getLocationById = async (req,res) => {
    const {locationId} = req.params;
    
    try {
        const location = await Location.findById(locationId)
            .select("-__v")
            .populate("band");

        console.log(location);

        if (!location) {
            return res.status(404).json({
                success: false,
                message: messages.noLocation,
            });
        }

        res.status(200).json({
            data: location,
            success: true, 
            message: `Location has been found`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error finding location by ID`,
            error: error.message
        })
    }
};

const createLocation = async (req,res) => {
    const {city, band} = req.body;

    try {
        const existingBand = await Band.findById(band);
        if (!existingBand) {
            return res.status(404).json({
                success: false,
                message: messages.noBand,
            });
        }
        
        const newLocation = new Location({city, band});
        await newLocation.save();

        res.status(201).json({
            data: newLocation,
            success: true,
            message: messages.locationCreated,
        });
    } catch (error) {
        if (error.name == "ValidationError") {
            res.status(422).json({
                success: false,
                message: "Validation error",
                error: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to create location",
                error: error.message,
            });
        }
    }
};

const updateLocation = async (req,res) => {
    const { locationId } = req.params;
    const { city } = req.body;

    try {
        const updatedLocation = await Location.findByIdAndUpdate(
            locationId,
            { city },
            { new: true },
        );

        if (!updatedLocation) {
            return res.status(404).json({
                success: false,
                message: messages.noLocation,
            });
        }

        res.status(200).json({
            data: updatedLocation,
            success: true, 
            message: messages.locationUpdated,
        });
    } catch (error) {
        console.error("Explain:", error);

        res.status(500).json({
            success: false,
            message: `Cannot update location information`,
            error: error.message,
        });
    }
};

const deletedLocation = async (req,res) => {
    const {locationId} = req.params;
    
    try {
        const deletedLocation = await Location.findByIdAndDelete(locationId);

        if (!deletedLocation) {
            return res.status(404).json({
                success: false,
                message: messages.noLocation,
            });
        }

        res.status(200).json({
            data: deletedLocation,
            success: true, 
            message: messages.locationDeleted,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `This location could not be removed`,
            error: error.message,
        });
    }
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deletedLocation
};