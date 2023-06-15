// const router = require("express").Router();
// const profileController = require("../controllers/profile-controller");

// // All users
// router
//   .route("/")
//   .get(profileController.allUsers)
//   .post(profileController.addUser);

// // A user 
// router
//   .route("/:userId")
//   .get(profileController.singleUser)
//   .delete(profileController.removeUser)

// // A user's saved sets
// router
//   .route("/:userId/sets")
//   .get(profileController.allSets)
//   .post(profileController.addSet)

// // A user's saved set
// router
//   .route("/:userId/sets/:setId")
//   .get(profileController.singleSet)
//   .delete(profileController.removeSet)

// // A user's saved sounds
// router
//   .route("/:userId/sounds")
//   .get(profileController.allSounds)
//   .post(profileController.addSound)

// // A user's saved sound
// router
//   .route("/:userId/sounds/:soundId")
//   .delete(profileController.removeSound)

// module.exports = router;