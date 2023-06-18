const knex = require("knex")(require("../knexfile"));

// GET all users
const allUsers = async (req, res) => {
  try {
    const users = await knex("users").select();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error retriving users`,
      detail: `${error.message}`,
    });
  }
};

// POST a user
const addUser = async (req, res) => {
  try {
    const newUser = await knex("users").insert(req.body);

    const user = await knex("users")
      .select("id", "username", "email")
      .where({ 
        id: newUser[0],
      });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error adding user ${req.body.username}`,
      detail: `${error.message}`,
    });
  }
};

// GET a user
const singleUser = async (req, res) => {
  try {
    const user = await knex("users")
      .select("id", "username", "email")
      .where({ 
        id: req.params.userId, 
      });
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error retriving user ${req.params.userId}`,
      detail: `${error.message}`,
    });
  }
};

// DELETE a user
const deleteUser = async (req, res) => {
  try {
    await knex("users")
      .where({
        id: req.params.userId,
      })
      .del();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error deleted user ${req.params.userId}`,
      detail: `${error.message}`,
    });
  }
};

// GET all user's sets
const allSets = async (req, res) => {
  try {
    const sets = await knex("sets")
      .join("users", "sets.user_id", "users.id")
      .select("sets.id", "sets.name", "sets.genre", "sets.updated_at")
      .where({
        "users.id": req.params.userId,
      });
    res.status(200).json(sets);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error retriving sets for user ${req.params.userId}`,
      detail: `${error.message}`,
    });
  }
};

// POST a new set (FIGURE OUT WAY TO ADD SET/SOUND IDS TO JUNCTION TABLE)
const addSet = async (req, res) => {
  try {
    const newSet = await knex("sets").insert(req.body);

    const set = await knex("sets")
      .select("id", "name", "genre", "created_at")
      .where({
        id: newSet[0],
      });
    res.status(201).json(set);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error adding set ${req.body.name}`,
      detail: `${error.message}`,
    });
  }
};

// GET a user's set
const singleSet = async (req, res) => {
  try {
    const set = await knex("set_sound")
      .join("users", "set_sound.user_id", "users.id")
      .join("sets", "set_sound.set_id", "sets.id")
      .join("sounds", "set_sound.sound_id", "sounds.id")
      .select("sounds.*")
      .where({
        "users.id": req.params.userId,
        "sets.id": req.params.setId,
      });
    res.status(200).json(set);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error retriving set ${req.params.setId} for user ${req.params.userId}`,
      detail: `${error.message}`,
    });
  }
};

// DELETE a set
const deleteSet = async (req, res) => {
  try {
    await knex("sets")
      .where({
        id: req.params.setId,
      })
      .del();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error deleted set ${req.params.setId} for user ${req.params.userId}`,
      detail: `${error.message}`,
    });
  }
};

// GET all user's liked sounds
const allSounds = async (req, res) => {
  try {
    const sounds = await knex("likes")
      .join("users", "likes.user_id", "users.id")
      .join("sounds", "likes.sound_id", "sounds.id")
      .select("sounds.*")
      .where({
        "users.id": req.params.userId,
      });
    res.status(200).json(sounds);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error retriving liked sounds for user ${req.params.userId}`,
      detail: `${error.message}`,
    });
  }
};

// POST a new liked sound
const addSound = async (req, res) => {
  try {
    const newSound = await knex("likes")
      .insert({
        user_id: req.params.userId,
        sound_id: req.body.sound_id,
      });

    const sound = await knex("likes")
      .select("id", "user_id", "sound_id")
      .where({
        id: newSound[0],
      });
    res.status(201).json(sound);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error liking sound ${req.body.sound_id}`,
      detail: `${error.message}`,
    });
  }
};

// DELETE a liked sound
const deleteSound = async (req, res) => {
  try {
    await knex("likes")
      .where({
        sound_id: req.params.soundId,
      })
      .del();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error unliking sound ${req.params.soundId} for user ${req.params.userId}`,
      detail: `${error.message}`,
    });
  }
};

module.exports = {
  allUsers,
  addUser,
  singleUser,
  deleteUser,
  allSets,
  addSet,
  singleSet,
  deleteSet,
  allSounds,
  addSound,
  deleteSound,
};
