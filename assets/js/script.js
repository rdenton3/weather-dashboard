var formEl = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#city")
var displayContainerEl = document.querySelector("#display-container")
var searchEl = document.querySelector("#city-search")

"https://api.openweathermap.org/data/2.5/weather?q=new_york&units=imperial&appid=d40c76615a039246eaf9d8955c56e72e";
var formSubmit = function(event) {
    event.preventDefault();
    // get value from the form input
    var city = cityInputEl.value.trim()
    // if city is entered, then call weather API function with city coordinates
    if (city) {
        cityPull(city)
        // then clear form input
        displayContainerEl.textContent = ""
        cityInputEl.value = "";
    }
    // else alert user they have not entered a value
    else {
        alert("Please enter a city name.")
    }
    // console.log(city)
}

// take user's city input and feed through API to get lon and lat
var cityPull = function(city){
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=d40c76615a039246eaf9d8955c56e72e"
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayCity(city)
            // retrieve the lat and lon coordinates to run through weatherPull and get weather data
            var lat = data.coord.lat
            var lon = data.coord.lon
            weatherPull(lat, lon)
        })
    })

}
// call weather function dynamically based on user inputs
var weatherPull = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=50ee644cfafc3cd04f5298fe9bd700dd"
}

var displayCity = function(city) {
    // first clear existing content
    displayContainerEl.textContent = ""
    searchEl.textContent = city
}

var displayWeather = function(data) {

}

formEl.addEventListener("submit", formSubmit)

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


