const router = require("express").Router();

const {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
} = require("../controller/locationController");

router.get("/", getAllLocations);

router.get("/:id", getLocationById);

router.post("/", createLocation);

router.put("/:id", updateLocation);

router.delete("/:id", deleteLocation);

module.exports = router;