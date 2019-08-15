exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('teams', function(table) {
      table.string('team_name').primary();
      table.string('team_conference');
      table.string('arrest_count');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('arrests', function(table) {
      table.string('team').primary();
      table.string('player');
      table.string('position');
      table.string('category');
      table.string('description');
      table.foreign('team')
        .references('teams.team_name');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('arrests'),
    knex.schema.dropTable('teams')
  ]);
};