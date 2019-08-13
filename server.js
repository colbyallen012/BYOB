const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3000)
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.locals.title = 'BYOB Parks';
app.locals.parks = [
  { id: '1', name: 'Weir Gulch South', park_type: 'park', park_class: 'linear' },
  { id: '2', name: 'Aztlan', park_type: 'park', park_class: 'neighborhood'  },
  { id: '3', name: 'Lowry Open Space', park_type: 'open space', park_class: 'special use'  }
];

app.get('/', (request, response) => {
});

app.get('/api/v1/parks', (request, response) => {
  const parks = app.locals.parks

  return response.status(200).json({parks})
})

app.get('/api/v1/parks/park_class/neighborhood', (request, response) => {
  const parkClass = 'neighborhood'
  const parks = app.locals.parks.filter(park => park.park_class === parkClass)

  return response.status(200).json({parks})
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
})

