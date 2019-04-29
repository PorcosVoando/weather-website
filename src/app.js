const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', function(req,res){
    res.render('index',{
        title: 'Weather',
        name: 'Lucas Ganciar Martins'
    })
})
app.get('/products', function(req,res){
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term '
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/about', function(req,res){
    res.render('about',{
        title: 'about me',
        name: 'lucas g'
    })
})
app.get('/weather', function(req,res){
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help', function(req,res){
    res.render('help',{
        title: 'help me',
        name: 'lucas g'
    })
})
app.get('/help/*', function(req,res){
    res.render('404',{
        title: '404 Help Page not found',
        name: 'lucas g',
        errorMessage: 'Help article not Found !!!'
    })
})
app.get('*', function(req,res){
    res.render('404',{
        title: '404 Not Found',
        name: 'lucas ganciar martins',
        errorMessage: 'Page could not be Found !!!'
    })
})
app.listen(3000, function(){
    console.log('Server is Onn')
})