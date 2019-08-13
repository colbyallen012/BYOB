const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3000)
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.locals.title = 'BYOB NFL Arrests';
app.locals.teams = [
  { id: '1', team_preffered_name: 'Denver Broncos', team_conference: 'AFC', arrest_count: '51'},
  { id: '2', team_preffered_name: 'Minnesota Vikings', team_conference: 'NFC', arrest_count: '50'},
  { id: '3', team_preffered_name: 'Cincinnati Bengals', team_conference: 'AFC', arrest_count: '44'}
];
app.locals.arrests = [
  { id: '1', team_preffered_name: 'Denver Broncos', name: 'Chad Kelly', category: 'Trespassing', description: 'The Englewood Colorado Police arrested and charged Kelly with first-degree criminal trespassing after a report of a man allegedly inside a home.'},
  { id: '2', team_preffered_name: 'Minnesota Vikings', name: 'Cayleb Jones', category: 'Domestic Assault', description: 'Accused of misdemeanor domestic assault, theft and interfering with a 911 phone call.'},
  { id: '3', team_preffered_name: 'Cincinnati Bengals', name: 'Adam Jones', category: 'Assault', description: 'Accused of poking hotel security employee in the eye in Cincinnati, obstructing police.'}
]

app.get('/', (request, response) => {
});

app.get('/api/v1/teams', (request, response) => {
  const getTeams = app.locals.teams

  return response.status(200).json({getTeams})
})

app.get('/api/v1/arrests', (request, response) => {
  const getArrests = app.locals.arrests

  return response.status(200).json({getArrests})
})

app.get('/api/v1/teams/:id', (resquest, response) => {
  const {id} = resquest.params;
  const specTeam = app.locals.teams.find(team => team.id === id);

  if(specTeam){
    return response.status(200).json({specTeam})
  } else {
    return response.sendStatus(404)
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
})

