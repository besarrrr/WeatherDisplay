var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var key = "fb2f9559d74a156a776b176fddac490c";

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityname = cityInputEl.value.trim();

    if (cityname) {
        getCityInfo(cityname);
        cityContainerEl.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city")
    }
};

function getCityInfo (cityname) {

    var apiurl = "http://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid="+key;

    fetch(apiurl)
    .then(function(response){
        if (response.ok){
        return response.json().then(function(data) {
            console.log(data);
           displayweather(data);
          });
        } else {
            alert('Error: City Not Found');
          }
    })
    .catch(function(error) {
        alert("Unable to connect to weather app");
      });
}

var displayweather = function (data) {

    var cityname = data.city.name
    var temp = kelvintofah(data.list[0].main.feels_like)
    var wind = data.list[0].wind.speed
    var humidity = data.list[0].main.humidity
    var description = data.list[0].weather[0].description

    var titleEl = document.createElement("p");
    var currentTime = moment().format('dddd, MMMM Do YYYY')
    titleEl.textContent = cityname + "," + " " + currentTime ;
    titleEl.setAttribute('id','titleid')
    
    var tempEl = document.createElement("p");
    tempEl.innerHTML = "Temp: " + Math.round(temp) + " F" ;
    tempEl.setAttribute('id','todayweather')

    var windEl = document.createElement("p");
    windEl.innerHTML = "Wind Speed: " + wind + " MPH"
    windEl.setAttribute('id','todayweather')

    var humidityEl = document.createElement("p");
    humidityEl.innerHTML = "Humidity: " + humidity + "%"
    humidityEl.setAttribute('id','todayweather')

    var descriptionEl = document.createElement("p");
    descriptionEl.innerHTML = "Current Reports: " + description
    descriptionEl.setAttribute('id','todayweather')

    cityContainerEl.append(titleEl, tempEl, windEl, humidityEl, descriptionEl)
} 

var fivedayforecast = function (data) {

    
}


var kelvintofah = function (K) {
   return 1.8*(K-273) + 32 
    
}


userFormEl.addEventListener("submit", formSubmitHandler);