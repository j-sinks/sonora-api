const knex = require("knex")(require("../knexfile"));

// All sounds in database
const allSounds = async (req, res) => {
  const { type, subgenre, key_scale } = req.query;
  try {
    const sounds = await knex("sounds")
      .select()
      .where({
        type,
        subgenre,
        key_scale,
      });
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
