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
  database('arrest').select('*')
    .then((arrest) => {
      response.status(200).json(arrest);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/teams/:id', (request, response) => {
  database('team').where('id', request.params.id).select()
    .then(team => {
      if (team.length) {
        response.status(200).json(team);
      } else {
        response.status(404).json({ 
          error: `Could not find team with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

app.get('/api/v1/arrests/:id', (request, response) => {
  database('arrest').where('id', request.params.id).select()
    .then(arrest => {
      if (arrest.length) {
        response.status(200).json(arrest);
      } else {
        response.status(404).json({ 
          error: `Could not find arrest with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

app.post('/api/v1/teams', (request, response) => {
  const team = request.body;
  for (let requiredParameter of ['team_name', 'team_conference', 'arrest_count']){
    if(!team[requiredParameter]) {
      return response
        .status(422)
        .send({error: `Expected format: {team_name: <String>, team_conference: <String> , arrest_count: <String>}. You're missing a '${requiredParameter}' property.`})
    }
  }
  database('team').insert(team, 'id')
    .then(team => {
      response.status(201).json({id: team[0]})
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
})

