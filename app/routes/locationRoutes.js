const router = require("express").Router();
const Location = require("../models/Locations");

const {
    getAllLocations,
    getLocationById,
    createLocation,
    updateBandsLocation,
    updateLocation,
    deletedLocation
} = require("../controller/locationController");

router.get("/", getAllLocations);

router.get("/:locationId", async (req, res, next) => {
    const locationId = req.params.locationId;
    console.log("location id:", locationId);
    
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
            success: true,
            location: location,
            message: `Location with ID ${locationId} successfully identified.`
        });
    } catch (err) {
        console.error("Error finding location", err);
        return res.status(500).json({
            success: false,
            message: `Unable to retrieve location with ID ${locationId}`,
            error: err.message
        });
    }
});

router.post("/", createLocation);

router.put("/:locationId", updateLocation);

router.delete("/:locationId", deletedLocation);

module.exports = router;