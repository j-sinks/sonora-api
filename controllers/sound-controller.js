const knex = require("knex")(require("../knexfile"));

// All sounds in database
const allSounds = async (_req, res) => {
  try {
    const sounds = await knex("sounds").select();
    res.status(200).json(sounds);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error retriving sounds`,
      detail: `${error.message}`,
    });
  }
};

module.exports = {
  allSounds,
};
