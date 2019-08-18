# BYOB 
## Build your own backend

This was a one week project at Turing School of Software & Design, where we built a RESTful API using Express.js with Knex. It has also been deployed to Heroku. The backend I built was a database of NFLL teams and arrests by team. These tables share a one to many relationship.

## Built With
Express.js
Knex
Deployed with Heroku

## Endpoints

- Teams `https://nflarrests1.herokuapp.com/api/v1/teams`
- Arrests `https://nflarrests1.herokuapp.com/api/v1/arrests`
- Specific Team`https://nflarrests1.herokuapp.com/api/v1/teams/:team_id`
- Specific Arrest `https://nflarrests1.herokuapp.com/api/v1/arrests/:arrest_id`

URL|Verb|Options|Sample Response
---|---|---|---
`https://nflarrests1.herokuapp.com/api/v1/teams`| GET | Not needed | Array of all existing teams `[{id: 65, team_name: "Denver Broncos", team_conference: "AFC", arrest_count: "51", created_at: "2019-08-16T17:19:13.387Z", updated_at: "2019-08-16T17:19:13.387Z"}]`
