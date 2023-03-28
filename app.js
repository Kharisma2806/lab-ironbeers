const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials('views/partials');

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', { title: 'Beers', beers });
    })
    .catch(error => {
      console.error(error);
      res.render('error', { message: 'Error retrieving beers from the database.' });
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(beer => {
      res.render('random-beer', { title: 'Random Beer', randomBeerFromApi: beer });
    })
    .catch(error => {
      console.error(error);
      res.render('error', { message: 'Error retrieving beers from the database.' });
    });
});


/*app.get('/', (req, res) => {
  res.render('index');
});*/

app.listen(3000, () => console.log('🏃‍ on port 3000'));
