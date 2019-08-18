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
  database('team').select('*')//Access team database and all teams inside.
    .then((team) => {
      response.status(200).json(team);//Send 'ok' status code, and return team data in json format.
    })
    .catch((error) => {
      response.status(500).json({ error });//Catch any errors from the request, if error send 'internal server' status code. Return specific error.
    });
});

app.get('/api/v1/arrests', (request, response) => {
  database('arrest').select('*')//Access arrest database and all teams inside.
    .then((arrest) => {
      response.status(200).json(arrest);//Send 'ok' status code, and return team data in json format.
    })
    .catch((error) => {
      response.status(500).json({ error });//Catch any errors from the request, if error send 'internal server' status code. Return specific error.
    });
});

app.get('/api/v1/teams/:id', (request, response) => {
  database('team').where('id', request.params.id).select()//Access team database and the specific id the user gives through the request.
    .then(team => {
      if (team.length) {//If the team database has teams inside iterate through and find the specific ID.
        response.status(200).json(team); //Send 'ok' status code, and return team data for the specific team in json format.
      } else { //If the team database doesn't have teams or specific team based on the id.
        response.status(404).json({ //Send 'not found' status code, and create an error with details I want the user to see.
          error: `Could not find team with id ${request.params.id}`
        });
      }
    })
    .catch(error => {//Catch other possible errors from the request, and send 'internal server' status code.
      response.status(500).json({ error });
    });
})

app.get('/api/v1/arrests/:id', (request, response) => {
  database('arrest').where('id', request.params.id).select()//Access arrest database and the specific id the user gives through the request.
    .then(arrest => {
      if (arrest.length) {//If the arrest database has teams inside iterate through and find the specific ID.
        response.status(200).json(arrest);//Send 'ok' status code, and return arrest data for the specific arrest in json format.
      } else { //If the arrest database doesn't have arrests or a specific arrest based on the id.
        response.status(404).json({ //Send 'not found' status code, and create an error with details I want the user to see.
          error: `Could not find arrest with id ${request.params.id}`
        });
      }
    })
    .catch(error => {{//Catch other possible errors from the request, and send 'internal server' status code.
      response.status(500).json({ error });
    }})
})

app.post('/api/v1/teams', (request, response) => {
  const team = request.body;//Create variable with the entire body of the request that was sent.
  for (let requiredParameter of ['team_name', 'team_conference', 'arrest_count']){ //These are the parameters that are required in the body to post to the database
    if(!team[requiredParameter]) { //If the user doesnt send the correct paramaters in the request
      return response
        .status(422)//Send 'unprocessable entitiy' status code
        .send({error: `Expected format: {team_name: <String>, team_conference: <String> , arrest_count: <String>}. You're missing a '${requiredParameter}' property.`}) //Create the error that I want to send the user to help them fix the error
    }
  }
  database('team').insert(team, 'id')//Access team database and pass the new team and id 
    .then(team => {
      response.status(201).json({id: team[0]})//Send 'created' status code, return the id of the new team
    })
    .catch(error => {
      response.status(500).json({ error });//Catch possible errors from the request, and send 'internal server' status code.
    })
})

app.post('/api/v1/arrests', (request, response) => {
  const arrest = request.body; //Create variable with the entire body of the request that was sent.
  for (let requiredParameter of ['team_name', 'team_id', 'player', 'position', 'category', 'description']){//These are the parameters that are required in the body to post to the database
    if(!arrest[requiredParameter]) { //If the user doesnt send the correct paramaters in the request
      return response
        .status(422)//Send 'unprocessable entitiy' status code
        .send({error: `Expected format: {team_name: <String>, team_id: <Integer> , player: <String>, position: <String>, category: <String>, description: <String>}. You're missing a '${requiredParameter}' property.`})//Create the error that I want to send the user to help them fix the error
    }
  }
  database('arrest').insert(arrest, 'id')//Access arrest database and pass the new team and id 
    .then(arrest => {
      response.status(201).json({id: arrest[0]})//Send 'created' status code, return the id of the new arrest
    })
    .catch(error => {
      response.status(500).json({ error });//Catch possible errors from the request, and send 'internal server' status code.
    })
})

app.delete('/api/v1/arrests/:id', (request, response) => { 
  database('arrest').where('id', request.params.id).delete()//Access arrest database and the specific id the user gives through the request.
    .then(arrest => {
      if (arrest.id) {//If the arrest database has the specific ID delete the arrest and return all arrests.
        response.status(200).json(arrest);//Send 'ok' status code, and return team data for the specific team in json format.
      } else {//If the arrest database doesn't have arrests or a specific arrest based on the id.
        response.status(404).json({ //Send 'not found' status code, and create an error with details I want the user to see.
          error: `Could not find arrest with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error }); //Catch other possible errors from the request, and send 'internal server' status code.
    });
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
})

