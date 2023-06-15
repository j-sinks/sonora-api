const router = require("express").Router();
const profileController = require("../controllers/profile-controller");

router
  .route("/")
  .get(profileController.allUsers)
  .post(profileController.addUser);
  
router
  .route("/:userId")
  .get(profileController.singleUser)
  .delete(profileController.removeUser)

router
  .route("/:userId/sets")
  .get(profileController.allSets)
  .post(profileController.addSet)

router
  .route("/:userId/sets/:setId")
  .get(profileController.singleSet)
  .delete(profileController.removeSet)

router
  .route("/:userId/sounds")
  .get(profileController.allSounds)
  .post(profileController.addSound)

router
  .route("/:userId/sounds/:soundId")
  .delete(profileController.removeSound)

module.exports = router;