const router = require("express").Router();
const {
    getAllBands, 
    getBandById, 
    createBand, 
    updateBand, 
    deleteBand
} = require("../controller/bandController");

router.get("/", getAllBands);

router.get("/:id", getBandById);

router.post("/", createBand);

router.put("/:id", updateBand);

router.delete("/:id", deleteBand);

module.exports = router;