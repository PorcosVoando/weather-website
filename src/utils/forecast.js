const request = require('request')



const forecast = function(latitude,longitude,callback){
    const URL = 'https://api.darksky.net/forecast/35137bb664976b5bc6d8ab99daa99a18/'+ latitude + ',' + longitude + '?units=si'
    request({url:URL,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        } else if(body.error){
            callback('Unable to find location!',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + ' its currently: ' + body.currently.temperature + ' °C. There is a ' + body.daily.data[0].precipProbability + '% of raining today. The temperature High its: ' + body.daily.data[0].temperatureMax + ' °C, and the temperature low its: ' + body.daily.data[0].temperatureMin + ' °C.' )
        }
    })
}

module.exports = forecast