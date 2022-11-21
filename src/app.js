const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Jeru'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Jeru'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page',
        message : 'This is help page!',
        name : 'Jeru'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error) {
                return res.send({ error })
            }

            //console.log(location)
            //console.log(forecastdata)
            res.send({
                forecast : forecastdata,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title :  '404 page',
        message : 'Help article not found',
        name : 'Jeru'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title :  '404 page',
        message : 'Page not found',
        name : 'Jeru'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})