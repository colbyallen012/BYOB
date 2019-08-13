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

app.get('/', (request, response) => {
});

app.get('/api/v1/teams', (request, response) => {
  const teams = app.locals.teams

  return response.status(200).json({teams})
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
})

