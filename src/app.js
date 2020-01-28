// nodemon file -e extensions,extensions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths or Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs') 
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vinicius Cosendey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Vinicius Cosendey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vinicius Cosendey'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
            
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Error 404',
        name: 'Vinicius Cosendey',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Error 404',
        name: 'Vinicius Cosendey',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})