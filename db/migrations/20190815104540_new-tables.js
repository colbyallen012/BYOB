exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('nflTeams', function(table) {
      table.string('team_name').primary();
      table.string('team_conference');
      table.string('arrest_count');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('nflArrests', function(table) {
      table.increments('id').primary();
      table.string('team_name');
      table.string('player');
      table.string('position');
      table.string('category');
      table.string('description');
      table.foreign('team_name')
        .references('nflTeams.team_name');

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