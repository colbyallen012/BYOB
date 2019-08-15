exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('teamsTable', function(table) {
      table.increments('id').primary();
      table.string('team_name');
      table.string('team_conference');
      table.string('arrest_count');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('arrestsTable', function(table) {
      table.increments('id').primary();
      table.string('team_name');
      table.integer('team_id').unsigned();
      table.string('player');
      table.string('position');
      table.string('category');
      table.string('description');
      table.foreign('team_id')
        .references('teamsTable.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('arrestsTable'),
    knex.schema.dropTable('teamsTable')
  ]);
};