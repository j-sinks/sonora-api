const router = require("express").Router();
const soundController = require("../controllers/sound-controller");

// All sounds in database
router.route("/").get(soundController.allSounds);

// A sound in database
router.route("/:soundId").get(soundController.singleSound);

module.exports = router;
