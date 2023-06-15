const router = require("express").Router();
const soundController = require("../controllers/sound-controller");

// All sounds in database
router.route("/").get(soundController.allSounds);

module.exports = router;
