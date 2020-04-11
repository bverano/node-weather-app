const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

//DEFINE PATHS FOR EXPRESS CONFIG
const public_dir_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path);

//SET UP STATIC DIRECTORY TO SERVE
app.use(express.static(public_dir_path));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bruno Verano'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bruno Verano'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        phone: '981085910',
        email: 'bverano@pucp.edu.pe',
        name: 'Bruno Verano'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.city) {
        return res.send({
            error: 'You must provide a city to get the weather.'
        });
    }

    let city = req.query.city;
    weather(city, (error, data) => {
        if(error) {
            return res.send({
                error,
                message: data
            })
        }
        let weather = data.weather.description + '. Its currently ' + data.temp + ' degrees out. There is a ' + data.precip + '% change of rain';
        res.send({
            city,
            weather
        })

    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found.',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.',
        title: '404'
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});