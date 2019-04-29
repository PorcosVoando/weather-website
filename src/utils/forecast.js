const request = require('request')



const forecast = function(latitude,longitude,callback){
    const URL = 'https://api.darksky.net/forecast/35137bb664976b5bc6d8ab99daa99a18/'+ latitude + ',' + longitude + '?units=si'
    request({url:URL,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        } else if(body.error){
            callback('Unable to find location!',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + ' its currently: ' + body.currently.temperature + ' °C')
        }
    })
}

module.exports = forecast