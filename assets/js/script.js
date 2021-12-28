// fetch the weather api and retrieve json data as array
var getWeather = function() {
    var response = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=50ee644cfafc3cd04f5298fe9bd700dd")
    .then(function(response) {
        response.json().then(function(data){
            console.log(data)
        })
    })
};
  
getWeather();

// call weather function dynamically based on user inputs
var weatherPull = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=50ee644cfafc3cd04f5298fe9bd700dd"

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data)
        })
    })
}

weatherPull(33.44,-94.04)