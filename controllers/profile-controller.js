const knex = require("knex")(require("../knexfile"));
// const validation = require("../middleware/validation");

// GET all users
const allUsers = async (req, res) => {
  try {
    const users = await knex("users")
      .select();
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
    const newUser = await knex("users").insert(req.body)

    const user = await knex("users")
      .select(
        "id",
        "username",
        "email"
      )
      .where({
        id: newUser[0]
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
      .select(
        "id",
        "username",
        "email"
      )
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
      .select(
        "sets.id",
        "sets.name",
        "sets.genre",
        "sets.updated_at"
      )
      .where({
        "users.id": req.params.userId
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

// POST a new set
const addSet = async (req, res) => {
  try {
    const newSet = await knex("sets").insert(req.body)

    const set = await knex("sets")
      .select(
        "id",
        "name",
        "genre",
        "created_at"
      )
      .where({
        id: newSet[0]
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

module.exports = {
  allUsers,
  addUser,
  singleUser,
  deleteUser,
  allSets,
  addSet,
};