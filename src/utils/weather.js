const axios = require('axios');

const weather = (city, callback) => {
    const key = '822af719be064ec4a9af5e48682beee4';
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${key}`;
    axios.get(url)
        .then((res) => {
            if(res.error) {
                return callback('Unable to connect to weather services.!', e);
            } else {
                let data = res.data.data[0];
                callback(undefined, data);
            }
        })
        .catch((e) => {
            callback('Unable to connect to weather services.!', e);
        })
}

module.exports = weather;