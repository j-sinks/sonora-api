const usersData = require("../seed-data/users");
const soundsData = require("../seed-data/sounds");
const setsData = require("../seed-data/sets");
const set_soundData = require("../seed-data/set_sound");
const likesData = require("../seed-data/likes");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex("likes")
    .del()
    .then(function () {
      return knex("set_sound").del();
    })
    .then(function () {
      return knex("sets").del();
    })
    .then(function () {
      return knex("sounds").del();
    })
    .then(function () {
      return knex("users").del();
    })
    .then(function () {
      return knex("users").insert(usersData);
    })
    .then(() => {
      return knex("sounds").insert(soundsData);
    })
    .then(() => {
      return knex("sets").insert(setsData);
    })
    .then(() => {
      return knex("set_sound").insert(set_soundData);
    })
    .then(() => {
      return knex("likes").insert(likesData);
    });
};
