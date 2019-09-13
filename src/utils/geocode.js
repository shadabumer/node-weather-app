const request = require('request');

/**
 * request() is a asynchronous function which takes options and callback as arguement.
 * @param {string} address  : name of the location of which latitude and longitude is required.
 * @param {anonymous function} callback : callback function which is defined in the app.js.
 */
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFnZ3ViYW5kYXIiLCJhIjoiY2swZXJnM21xMDM3czNtbXh3NWgzZW53ciJ9.oFIRp0oCVpVuqfAgj8EoVA`;

    request( {url: url, json: true}, (error, { body }) => {
        // console.log(body)
        if(error) {
            callback('Unable to connect to the weather service!', undefined);
        }
        // if the address is given semicolon(;), mapbox returns json as {"message": "forbidden"}
        else if (body.message) {
            callback('Bad location name!', undefined);
        }
        // if the wrong address is given an empty features array is returned by the mapbox. i.e, features = []
        else if (body.features.length === 0) {
            callback('Unable to find the location. Try another search!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;