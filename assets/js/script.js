// // fetch the weather api and retrieve json data as array
// var getWeather = function() {
//     var response = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=50ee644cfafc3cd04f5298fe9bd700dd")
//     .then(function(response) {
//         response.json().then(function(data){
//             console.log(data)
//         })
//     })
// };
  
// getWeather();
var formEl = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#city")

var formSubmit = function(event) {
    // prevent default behavior which for form element would be to send form input data to a URL
    // we want to handle the form input data in js
    event.preventDefault();
    console.log("log event")
    // get value from the form input
    var city = cityInputEl.value.trim().toLowerCase()
    // if city is entered, then call weather API function with city coordinates
    if (city) {
        weatherPull(33.44,-94.04)
    }
    // else alert user they have not entered a value
    else {
        alert("Please enter a city name")
    }
    console.log(city)
}
// call weather function dynamically based on user inputs
var weatherPull = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=50ee644cfafc3cd04f5298fe9bd700dd"

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data)
        })
    })
}

// weatherPull(33.44,-94.04)
formEl.addEventListener("submit", formSubmit)
