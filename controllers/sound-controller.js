const knex = require("knex")(require("../knexfile"));

// Checks if an object is empty
const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Checks if an object has two keys
const isObjectTwo = (obj) => {
  return Object.keys(obj).length === 2;
};

// Checks if req.query is empty, if true all sounds are provided
// If not, the query parameters are applied
const allSounds = async (req, res) => {
  if (isObjectEmpty(req.query)) {

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

  } else if (isObjectTwo(req.query)) {

    const { type, subgenre } = req.query;

    try {
      const sounds = await knex("sounds").select().where({
        type,
        subgenre,
      });
      res.status(200).json(sounds);
    } catch (error) {
      res.status(500).json({
        error: true,
        message: `Error retriving sounds`,
        detail: `${error.message}`,
      });
    }

  } else {

    const { type, subgenre, key_scale, rel_key_scale } = req.query;

    try {
      const sounds = await knex("sounds").select().where({
        type,
        subgenre,
        key_scale,
        rel_key_scale,
      });
      res.status(200).json(sounds);
    } catch (error) {
      res.status(500).json({
        error: true,
        message: `Error retriving sounds`,
        detail: `${error.message}`,
      });
    }

  }
};

module.exports = {
  allSounds,
};
