const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port =  process.env.PORT || 3000

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Sidhant Chandak'
    })
})


app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sidhant Chandak'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sidhant Chandak'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address) return res.send({
        error: 'Please provide an address!'
    })

    // res.send({
    //     forecast: 'asd'
    // })


    //console.log(req.query.address)


    geocode(req.query.address, (error, {lat, lon, location} = {}) =>{
        if(error) return res.send( {error} )
        forecast(lat, lon, (error,forecastData) => {
            if(error) return res.send ({error})

            res.send({
                location,
                forecast: forecastData,
                addresss: req.query.address
            })
        })
    })
 })

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Sidhant Chandak',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Sidhant Chandak',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log(`Server is up on port ${port}`)
})
