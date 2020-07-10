const request = require('request')

const forecast = (lat, lon, callback) => {

const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon) + '&exclude=hourly,daily&appid=f4a35a9295dcb1dc57b6dc97f7bde7c6'

request( { url, json: true}, (error, {body} ) => {

    if(error) callback ('Unable to connect to weather service', undefined)
    else {
        callback( undefined, 
            body.current.weather[0].description + '. It is currently ' + body.current.temp + " degrees out. There's a " + body.current.humidity + '% chance of rain.'
        )
    }
})

}
module.exports = forecast