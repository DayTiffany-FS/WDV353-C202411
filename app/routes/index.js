const express = require("express");
const router = express.Router();
const bandRoutes = require("./bandRoutes");
const locationRoutes = require("./locationRoutes");

router.get("/", (req,res) => {
    res.status(200).json({success: true, message: `${req.method} - Request made`});
});

router.use("/bands", bandRoutes);

router.use("/locations", locationRoutes);

module.exports = router;