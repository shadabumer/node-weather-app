const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/a0a28623c1e8af9d3b40fa1683cb896a/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if (body.error) {
            callback('Ivalide longitude or latitude!', undefined);
        } else {
            let data = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out.
            There is a ${Math.round(body.currently.precipProbability * 100)}% chance of rain.
            The wind speed is ${body.currently.windSpeed}`;
            callback(undefined, data);
        }
    })
}
module.exports = forecast;