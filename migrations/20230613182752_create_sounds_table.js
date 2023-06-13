/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("sounds", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("type").notNullable();
      table.string("genre").notNullable().defaultTo("none");
      table.string("key_scale").nullable();
      table.integer("bpm").notNullable();
      table.integer("length").notNullable();
      table.string("url").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("sounds");

};
