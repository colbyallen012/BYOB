let teamsData = [
  {
    team_name: "Denver Broncos",
    team_conference: "AFC",
    arrest_count: "51"
    },
    {
    team_name: "Minnesota Vikings",
    team_conference: "NFC",
    arrest_count: "50"
    },
    {
    team_name: "Cincinnati Bengals",
    team_conference: "AFC",
    arrest_count: "44"
    }
]



exports.seed = function(knex) {
  return knex('arrest').del()
    .then(() => knex('team').del())

  .then(() => {
    return Promise.all([
      knex('team').insert({
        team_name: 'Denver Broncos', team_conference: 'AFC', arrest_count: '100'
      }, 'id')

      .then(team => {
        return knex('arrest').insert([
          {team_name: 'Denver Broncos', player: 'Chad Kelly', position: 'QB', category: 'Trespassing', description: 'breaking in', team_id: team[0]},
        ])
      })

      .then(() => console.log('database successfully seeded!'))
      .catch(error => console.log(`There is an error with seeding ${error}`))
    ])
  })
  .catch(error => console.log(`There is an error with seeding ${error}`))
};