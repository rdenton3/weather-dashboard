var formEl = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#city")
var displayContainerEl = document.querySelector("#display-container")
var searchEl = document.querySelector("#city-search")
var dailyTempEl = document.querySelector("#temp")
var dailyWindEl = document.querySelector("#wind")
var dailyHumidEl = document.querySelector("#humid")
var dailyUviEl = document.querySelector("#uvi")
var dateEl = document.querySelector("#today")
var forecastContainer = document.querySelector(".forecasts")
var citiesEl = document.querySelector("#cities")
var savedCityBtn = document.querySelector(".btn2")

var cityStorage = function(city) {
   //check if cities array already exist, else create an array
   var storedCities = JSON.parse(localStorage.getItem("storedCities")) || []
   // put new city into an object
   var newCity = {city: city}
   // push object into an array
   storedCities.push(newCity)
   // save to local storage
   localStorage.setItem("storedCities", JSON.stringify(storedCities))
}

var getSavedCities = function() {
    var savedCities = localStorage.getItem("storedCities")
    // parse into array of objects
    savedCities  = JSON.parse(savedCities)
    // loop through saved cities and display them on page
    for (i=0; i< savedCities.length; i++){
        // create button + li element
        citiesButton = document.createElement("button")
        citiesLi = document.createElement("li")
        var savedCityName = savedCities[i].city
        console.log(savedCityName)
        citiesButton.innerHTML = savedCityName
        citiesButton.setAttribute("city-name", savedCities[i].city)
        citiesButton.classList = "btn2"
        citiesLi.appendChild(citiesButton)
        citiesEl.appendChild(citiesLi)
    }
}

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
        // then create a button element to display on the page and append to page
        citiesButton = document.createElement("button")
        citiesLi = document.createElement("li")
        citiesButton.innerHTML = city
        citiesButton.setAttribute("city-name", city)
        citiesButton.classList = "btn2"
        citiesLi.appendChild(citiesButton)
        citiesEl.appendChild(citiesLi)
        // save searches into local storage
        cityStorage(city)
    }
    else {
        alert("Please enter a city name.")
    }
}
// load weather data from saved cities
var loadCities = function(event) {
    event.preventDefault();
    // pull the attribute
    var city = event.target.getAttribute("city-name");
    console.log(city)
    if (city) {
        cityPull(city)
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

// function to call icon depending on weather that day
var callIcon = function(weather) {
    if (weather === "Clear") {
        var dispIcon = "fas fa-sun"
        return dispIcon
    }
    else if (weather === "Clouds") {
        var dispIcon = "fas fa-cloud-sun"
        return dispIcon
    }
    else if (weather === "Rain") {
        var dispIcon = "fas fa-cloud-rain"
        return dispIcon
    }
    else if (weather === "Mist" || weather === "Fog") {
        var dispIcon = "fas fa-smog"
        return dispIcon
    }
    else if (weather === "Snow") {
        var dispIcon = "fas fa-snowflake"
        return dispIcon
    }
}

// function to color code uv index
var uviColor = function(uvi) {
    if (uvi < 3) {
        var uvClass = "green"
        return uvClass
    } 
    else if (uvi > 3 && uvi <7) {
        var uvClass = "yellow"
        return uvClass 
    }
    else {
        uvClass = "red"
        return uvClass
    }
}

// call weather function dynamically based on user inputs
var weatherPull = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=50ee644cfafc3cd04f5298fe9bd700dd"
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data)
            // grab all current data and display
            var temp = data.current.temp
            var wind = data.current.wind_speed
            var humid = data.current.humidity
            var uvi = data.current.uvi
            displayWeather(temp,wind,humid,uvi)
            var conditions = data.current.weather[0].main
            // get color of uvi 
            setUv = uviColor(uvi)
            console.log(setUv)
            dailyUviEl.classList = setUv
            // create weather icon
            var iconEl = document.createElement("span")
            var classIcon = callIcon(conditions)
            iconEl.classList = classIcon
            dateEl.appendChild(iconEl)
            // grab forecasted data
            console.log(data)
            // remove data from any previous loads
            forecastContainer.innerHTML = ""
            // loop over forecasted data and dispay on page
            for (i=1; i < 6; i++) {
                // collect weather variables
                var forecastTemp = data.daily[i].temp.day
                var forecastWind = data.daily[i].wind_speed
                var forecastHumid = data.daily[i].humidity
                var forecastUvi = data.daily[i].uvi
                var fConditions = data.daily[i].weather[0].main
                // set the date 
                var day = moment().add(i,'d').format("MM-DD-YYYY")
                // get color of uvi 
                setUvi = uviColor(forecastUvi)
                // get forecast icon
                var fIcon = callIcon(fConditions)
                // create container for each weather variable
                var forecastEl = document.createElement("div")
                forecastEl.classList = "card col btn"
                forecastEl.textContent = day
                // create span element to display the weather variable
                var forecastIconEl = document.createElement("div")
                forecastIconEl.classList = fIcon
                var dispTemp = document.createElement("div")
                dispTemp.textContent = "Temp: " + forecastTemp
                var dispWind = document.createElement("div")
                dispWind.textContent = "Wind: " + forecastWind
                var dispHumid = document.createElement("div")
                dispHumid.textContent = "Humidity: " + forecastHumid
                var dispUvi = document.createElement("div")
                dispUvi.textContent = "UVI: " + forecastUvi
                dispUvi.classList = setUvi
                // append to div container
                forecastEl.append(forecastIconEl,dispTemp,dispWind,dispHumid,dispUvi)
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
citiesEl.addEventListener("click", loadCities)
// load saved cities in local storage
getSavedCities()
