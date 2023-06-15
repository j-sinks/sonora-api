const router = require("express").Router();
const soundController = require("../controllers/sound-controller");

router.route("/").get(soundController.allSounds);

module.exports = router;
