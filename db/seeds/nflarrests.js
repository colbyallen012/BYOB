var teams = require('../../data/teamData.js') 
var arrests = require('../../data/arrestData.js')

const createTeam = (knex,team) => {
  return knex('team').insert({
    team_name: team.team_name,
    team_conference: team.team_conference,
    arrest_count: team.arrest_count
  }, 'id')
  .then(team => {
    let arrestPromises = [];

    arrests.arrests.forEach(arrest => {
      arrestPromises.push(
        createArrest(knex, {
          team_name: arrest.team_name, 
          player: arrest.player, 
          position: arrest.position, 
          category: arrest.category, 
          description: arrest.description, 
          team_id: team[0]
        })
      )
    });

    return Promise.all(arrestPromises)
  })
};

const createArrest = (knex, arrest) => {
  return knex('arrest').insert(arrest)
};

exports.seed = (knex) => {
  return knex('arrest').del() 
    .then(() => knex('team').del()) 
    .then(() => {
      let teamPromises = [];

      teams.teams.forEach(team => {
        teamPromises.push(createTeam(knex, team));
      });

      return Promise.all(teamPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};