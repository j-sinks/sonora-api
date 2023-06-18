const knex = require("knex")(require("../knexfile"));

// Check if requested user exists
const validateUser = async (req, res, next) => {

  try {
    const user = await knex("users").where({ id: req.params.userId }).first();

    if (!user) {
      return res.status(404).json({
        error: true,
        message: `User ${req.params.userId} does not exist. Please provide a valid user ID`,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `An error occurred while validating user`,
      detail: `${error.message}`,
    });
  }
};

// Check if correct fields have been submitted to add new user
const validateNewUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "The following fields must be provided: username, email, and password",
    });
  }

  next();
};

// Check if correct fields have been submitted to add new user
const validateNewSet = (req, res, next) => {
  const { user_id, name, genre } = req.body;

  if (!user_id || !name || !genre) {
    return res.status(400).json({
      error: true,
      message: "The following fields must be provided: user ID, name, and genre",
    });
  }

  next();
};

// Check if requested set exists
const validateSet = async (req, res, next) => {

  try {
    const set = await knex("sets").where({ id: req.params.setId }).first();

    if (!set) {
      return res.status(404).json({
        error: true,
        message: `Set ${req.params.setId} does not exist. Please provide a valid set ID`,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `An error occurred while validating set`,
      detail: `${error.message}`,
    });
  }
};

module.exports = {
  validateUser,
  validateNewUser,
  validateNewSet,
  validateSet,
};
