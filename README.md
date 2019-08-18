# BYOB 
## Build your own backend

This was a one week project at Turing School of Software & Design, where we built a RESTful API using Express.js with Knex. It has also been deployed to Heroku. The backend I built was a database of NFLL teams and arrests by team. These tables share a one to many relationship.

## Built With

Express.js

Knex

Deployed with Heroku

## Endpoints

- Main `https://nflarrests1.herokuapp.com`
- Teams `https://nflarrests1.herokuapp.com/api/v1/teams`
- Arrests `https://nflarrests1.herokuapp.com/api/v1/arrests`
- Specific Team`https://nflarrests1.herokuapp.com/api/v1/teams/:team_id`
- Specific Arrest `https://nflarrests1.herokuapp.com/api/v1/arrests/:arrest_id`

URL|Verb|Options|Sample Response
---|---|---|---
`https://nflarrests1.herokuapp.com/api/v1/teams`| GET | Not needed | Array of all existing teams `[{id: 65, team_name: "Denver Broncos", team_conference: "AFC", arrest_count: "51"}]`
`https://nflarrests1.herokuapp.com/api/v1/arrests` | GET | Not needed | Array of all arrests `[{id: 1921, team_name: "Denver Broncos", team_id: 65, player: "Chad Kelly", position: "QB", category: "Trespassing", description: "The Englewood Colorado Police arrested and charged Kelly with first-degree criminal trespassing after a report of a man allegedly inside a home."}]`
`https://nflarrests1.herokuapp.com/api/v1/teams/` | POST | `{team_name: <String>, team_conference: <String> , arrest_count: <String>}` | New Team `{team_name: 'Puppies', team_conference: 'NFC', arrest_count: '100'}`
`https://nflarrests1.herokuapp.com/api/v1/arrests/` | POST | `{team_name: <String>, team_id: <Integer> , player: <String>, position: <String>, category: <String>, description: <String>}` | New Arrest `{team_name: 'Puppies', team_id: 7, player: 'Rufus Dog', position: 'Retriever', category: 'theft', description: 'stealing all the kibble'}`
`https://nflarrests1.herokuapp.com/api/v1/arrests/` | DELETE | `{id: <Integer>}` | Array of existing teams after delete `[{id: 65, team_name: "Denver Broncos", team_conference: "AFC", arrest_count: "51"}]`
