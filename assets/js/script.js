var formEl = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#city")
var displayContainerEl = document.querySelector("#display-container")
var searchEl = document.querySelector("#city-search")
var dailyTempEl = document.querySelector("#temp")
var dailyWindEl = document.querySelector("#wind")
var dailyHumidEl = document.querySelector("#humid")
var dailyUviEl = document.querySelector("#uvi")
var dateEl = document.querySelector("#today")
forecastContainer = document.querySelector(".forecasts")

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
    else {
        alert("Please enter a city name.")
    }
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
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=50ee644cfafc3cd04f5298fe9bd700dd"
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            // grab all current data and display
            var temp = data.current.temp
            var wind = data.current.wind_speed
            var humid = data.current.humidity
            var uvi = data.current.uvi
            displayWeather(temp,wind,humid,uvi)
            // grab forecasted data
            console.log(data)
            // loop over forecasted data and dispay on page
            for (i=1; i < 6; i++) {
                // collect weather variables
                var forecastTemp = data.daily[i].temp.day
                var forecastWind = data.daily[i].wind_speed
                var forecastHumid = data.daily[i].humidity
                var forecastUvi = data.daily[i].uvi
                // set the date 
                var day = moment().add(i,'d').format("MM-DD-YYYY")
                console.log(day)
                // create container for each weather variable
                var forecastEl = document.createElement("div")
                forecastEl.classList = "card"
                forecastEl.textContent = day
                // create span element to display the weather variable
                var dispTemp = document.createElement("div")
                dispTemp.textContent = "Temp: " + forecastTemp
                var dispWind = document.createElement("div")
                dispWind.textContent = "Wind: " + forecastWind
                var dispHumid = document.createElement("div")
                dispHumid.textContent = "Humidity: " + forecastHumid
                var dispUvi = document.createElement("div")
                dispUvi.textContent = "UVI: " + forecastUvi
                // append to div container
                forecastEl.append(dispTemp,dispWind,dispHumid,dispUvi)
                // append to html
                forecastContainer.appendChild(forecastEl)

            }
        })
    })
}

var displayCity = function(city) {
    // pull todays date
    var today = moment().format("MM-DD-YYYY");
    // first clear existing content
    displayContainerEl.textContent = ""
    searchEl.textContent = city
    dateEl.textContent = " " + today 
}

var displayWeather = function(temp,wind,humid,uvi) {
    dailyTempEl.textContent = temp
    dailyWindEl.textContent = wind
    dailyHumidEl.textContent = humid
    dailyUviEl.textContent = uvi
}

formEl.addEventListener("submit", formSubmit)

