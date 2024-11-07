const express = require("express");
const router = express.Router();
const bandRoutes = require("./bandRoutes");

router.get("/", (req,res) => {
    res.status(200).json({success: true, message: `${req.method} - Request made`});
});

router.use("/bands", bandRoutes);

module.exports = router;