const express = require('express');
const app = express();
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000)
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.locals.title = 'BYOB NFL Arrests';

app.get('/', (request, response) => {
  response.json('Initial')
});

app.get('/api/v1/teams', (request, response) => {
  database('team').select('*')
    .then((team) => {
      response.status(200).json(team);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/arrests', (request, response) => {
  database('arrest').select()
    .then((arrest) => {
      response.status(200).json(arrest);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/teams/:id', (resquest, response) => {
  const {id} = resquest.params;
  const specTeam = app.locals.teams.find(team => team.id === id);

  if(specTeam){
    return response.status(200).json({specTeam})
  } else {
    return response.sendStatus(404)
  }
})

app.get('/api/v1/arrests/:id', (resquest, response) => {
  const {id} = resquest.params;
  const player = app.locals.arrests.find(arrest => arrest.id === id);

  if(player){
    return response.status(200).json({player})
  } else {
    return response.sendStatus(404)
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
})

