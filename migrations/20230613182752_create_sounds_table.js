/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
    })
    .createTable("sounds", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("type").notNullable();
      table.string("genre").notNullable().defaultTo("none");
      table.string("subgenre").notNullable().defaultTo("none");
      table.string("key_scale").nullable();
      table.string("rel_key_scale").nullable();
      table.integer("bpm").notNullable();
      table.integer("length").notNullable();
      table.string("url").notNullable();
    })
    .createTable("sets", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name").notNullable();
      table.string("genre").notNullable().defaultTo("none");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("set_sound", (table) => {
      table.increments("id").primary();
      table
        .integer("set_id")
        .unsigned()
        .references("sets.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("sound_id")
        .unsigned()
        .references("sounds.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("likes", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("sound_id")
        .unsigned()
        .references("sounds.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("likes")
    .dropTable("set_sound")
    .dropTable("sets")
    .dropTable("sounds")
    .dropTable("users");
};
