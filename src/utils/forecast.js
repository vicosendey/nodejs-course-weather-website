const request = require('request');

const forecast = ((latitude, longitude, callback) => {
    const url       = `https://api.darksky.net/forecast/86933d7aae39a4691442101b33f6ab7d/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si&lang=pt`;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to darksky services', undefined);
        } else if(body.error){
            callback('Unable to find location in darksky', undefined);
        } else{
            callback(undefined,`It is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability} chance of rain. Max: ${body.daily.data[0].temperatureHigh} and Min: ${body.daily.data[1].temperatureLow}`);
        }
    });
});

module.exports = forecast;