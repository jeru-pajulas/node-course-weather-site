const request = require('postman-request')

// request({ url : weatherURL, json : true}, (error, response) => {
//     //console.log(response.body.current.observation_time)
//     if(error) {
//         console.log('Unable to connect to weather service!')
//     }else if(response.body.error) {
//         console.log('Unable to find location')
//     }else {
//         console.log(response.body.current.weather_descriptions[0] + 
//             ' It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + 
//         response.body.current.feelslike + ' degrees out.')
//     }
// })

const forecast = (latitude , longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=61b2fcf475565e4724d92b254c7ec2ef&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json : true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error) {
            callback('Unable to find location', undefined)
        }else {
            // callback(undefined, {
            //     description : response.body.current.weather_descriptions[0],
            //     location : response.body.location.name,
            //     temperature : response.body.current.temperature,
            //     feelslike : response.body.current.feelslike
            // })
            callback(undefined, body.current.weather_descriptions[0] + 
            '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + 
            body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast