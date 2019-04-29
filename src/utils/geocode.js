const request = require('request')


const geocode = function(address,callback){
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoicG9yY29zdm9hbmRvIiwiYSI6ImNqdXd6dmI0YTBoODczeXNkMjBjYzFveDAifQ.64FACHtRLJMDqnsVWMT-yQ'
    request({url: geocodeURL,json: true},function(error,response){
        if(error){
            callback('Unable to connect to location geocode service!!',undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location, try another search!!',undefined)
        } else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode
