const router = require("express").Router();
const profileController = require("../controllers/profile-controller");
const {
  validateUser,
  validateNewUser,
  validateNewSet,
  validateSet,
} = require("../middleware/validation");

// All users
router
  .route("/")
  .get(profileController.allUsers)
  .post(validateNewUser, profileController.addUser);

// A user
router
  .route("/:userId")
  .get(validateUser, profileController.singleUser)
  .delete(validateUser, profileController.deleteUser);

// A user's saved sets
router
  .route("/:userId/sets")
  .get(validateUser, profileController.allSets)
  .post(validateUser, validateNewSet, profileController.addSet);

// A user's saved set
router
  .route("/:userId/sets/:setId")
  .get(validateUser, validateSet, profileController.singleSet)
  .delete(validateUser, validateSet, profileController.deleteSet);

// A user's saved sounds
// router
//   .route("/:userId/sounds")
//   .get(profileController.allSounds)
//   .post(profileController.addSound)

// A user's saved sound
// router
//   .route("/:userId/sounds/:soundId")
//   .delete(profileController.removeSound)

module.exports = router;
