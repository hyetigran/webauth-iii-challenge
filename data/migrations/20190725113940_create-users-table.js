exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("username", 128)
      .unique()
      .notNullable();
    table.string("password", 128).notNullable();
    table
      .string("email", 255)
      .notNullable()
      .unique();
    table.string("department").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
