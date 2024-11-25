const Location = require("../models/Locations");
const Band = require("../models/Band");
const messages = require("../messages/Messages");

const getAllLocations = async (req,res) => {
    try {
        const {locationName, sortBy, sortOrder = "asc", page =1, limit = 3} = req.query;

        const query = {};
        if (locationName) {
            query.location = {$regex: locationName, $options: "i"}; 
        }

        const skip = (page - 1) * limit;
        const sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === "desc" ? -1: 1;
        }

        const locations = await Location.find(query)
        .populate("bands")
        .select("-__v")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));

        const totalLocations = await Location.countDocuments(query);
        
        res.status(200).json({
            data: locations,
            success: true, 
            total: totalLocations,
            pages: Math.ceil(totalLocations / limit),
            currentPage: Number(page),
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
            .populate("bands");

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
        });
    }
};

const createLocation = async (req,res) => {
    const {location} = req.body;

    try {
        const newLocation = new Location({location});
        const savedLocation = await newLocation.save();

        const locationId = savedLocation._id;

        await updateBandsLocation(locationId, location);

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

const updateBandsLocation = async (locationId, locationName) => {
    try {
        const result = await Band.updateMany(
            {location: locationName},
            {$set: {location: locationId}}
        );

        if (result.modifiedCount===0){
            console.log("No bands found to update at specified location");
            return;
        }
        console.log(`Listed bands have had their location updated and linked to newly created location`)
    } catch (error) {
        console.error("Could not update with newly created location", error);
    }
};

const updateLocation = async (req,res) => {
    const { locationId } = req.params;
    const { location } = req.body;

    try {
        const updatedLocation = await Location.findByIdAndUpdate(
            locationId,
            { location },
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
    updateBandsLocation,
    updateLocation,
    deletedLocation
};