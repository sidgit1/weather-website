const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGVjaC1zaWQiLCJhIjoiY2tjOWpnMW8zMWlqeTJ4cXN5czZ1cTlveSJ9._CmtVlAUYENkascszHXHJQ'
    request( {url, json: true, limit: 1}, (error, {body} ) => {

        if (error) callback('Unable to connect to the location service', undefined )

        else if (body.features.length === 0) callback ('Unable to find location. Try another search!', undefined)
        
        else{
            callback ( undefined, {
            lat: body.features[0].center[1],
            lon: body.features[0].center[0],
            location: body.features[0].place_name
            })
        }

    })

}

module.exports = geocode