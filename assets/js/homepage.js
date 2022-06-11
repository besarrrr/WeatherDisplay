var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");

var day2El = document.querySelector("#day2")
var day3El = document.querySelector("#day3")
var day4El = document.querySelector("#day4")
var day5El = document.querySelector("#day5")
var day6El = document.querySelector("#day6")

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
            console.log(data)
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

    for(var i=0; i < data.length; i+8) {

        var date2 = moment().add(1, 'days').calendar();
        var temp2 = kelvintofah(data.list[i].main.feels_like)
        var wind2 = data.list[i].wind.speed
        var humidity2 = data.list[i].main.humidity
        var description2 = data.list[i].weather[0].main
       
        if(description==="Clouds"){
            imgtag.attr("src", "https://img.icons8.com/color/48/000000/cloud.png")
        } else if(skyconditions==="Clear"){
            imgtag.attr("src", "https://img.icons8.com/color/48/000000/summer.png")
        }else if(skyconditions==="Rain"){
            imgtag.attr("src", "https://img.icons8.com/color/48/000000/rain.png")
        }

        var dateEl = document.createElement("p");
        dateEl.innerHTML = date2

        var descriptionEl = document.createElement("p");
        descriptionEl.innerHTML = "Current Reports: " + description2

        var tempEl = document.createElement("p");
        tempEl.innerHTML = "Temp: " + Math.round(temp2) + " F" ;

        var humidityEl = document.createElement("p");
        humidityEl.innerHTML = "Humidity: " + humidity2 + "%"

    
        day2El.append(dateEl, descriptiomEl, tempEl, humidityEl)
        day3El.append(dateEl, descriptiomEl, tempEl, humidityEl)
        day4El.append(dateEl, descriptiomEl, tempEl, humidityEl)
        day5El.append(dateEl, descriptiomEl, tempEl, humidityEl)
        day6El.append(dateEl, descriptiomEl, tempEl, humidityEl)
        
    }
    
}   


var kelvintofah = function (K) {
   return 1.8*(K-273) + 32 
    
}


userFormEl.addEventListener("submit", formSubmitHandler);