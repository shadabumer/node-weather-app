// node core modules
const path = require('path');

// npm packages
const express = require('express');
const hbs = require('hbs');

// user created apis
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);

console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

// Defining path for templates folder to render the views
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// serving static websites
app.use(express.static(publicDirectoryPath));

// Handlebars for serving dynamic webpages.
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John Doe'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'John Doe'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a helping message.',
        title: 'Help',
        name: 'John Doe'
    });
});

/**
 * Actual functionality of the app is implemented here.
 * if address query param is provided in the url, then it is used inside geocode to get the latitude and longitude.
 * This iformation is forwaded to forecast to get the weather report.
 */
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address!'
        });
    } 
    // getting the latitude and longitude from mapbox.
    let inputLocation = req.query.address;
    geocode(inputLocation, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error: error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error});
            }
            res.send({
                Location: location,
                message: forecastData
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }
    console.log(req.query.search);
    res.send({
        product: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('help404', {
        message: 'Help article not found'
    });
});

// Handling 404 page error
app.get('*', (req, res) => {
    res.render('Page404', {
        message: 'The page you are looking for, could not be found!'
    });
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});