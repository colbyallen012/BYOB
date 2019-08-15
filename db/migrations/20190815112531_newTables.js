exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('team', function(table) {
      table.increments('id').primary();
      table.string('team_name');
      table.string('team_conference');
      table.string('arrest_count');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('arrest', function(table) {
      table.increments('id').primary();
      table.string('team_name');
      table.integer('team_id').unsigned();
      table.string('player');
      table.string('position');
      table.string('category');
      table.string('description');
      table.foreign('team_id')
        .references('team.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('arrest'),
    knex.schema.dropTable('team')
  ]);
};
