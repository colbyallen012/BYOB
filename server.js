const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3000)
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.locals.title = 'Pet Box';
app.locals.parks = [
  { id: '1', name: 'Weir Gulch South', park_type: 'park' },
  { id: '2', name: 'Aztlan', park_type: 'park' },
  { id: '3', name: 'Lowry Open Space', park_type: 'open space' }
];


