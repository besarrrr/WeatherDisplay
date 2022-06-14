var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var savedSearchesEl = document.querySelector('#saved-searches')
var pastsearches = JSON.parse(localStorage.getItem("lastSearchedCity"))||[]
console.log(pastsearches)

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

        day2El.textContent = "";
        day3El.textContent = "";
        day4El.textContent = "";
        day5El.textContent = "";
        day6El.textContent = "";

    } else {
        alert("Please enter a valid city")
    }

   saveLastSearchedCity(cityname);

};

function createmenu (){
    savedSearchesEl.innerHTML = "";
    for(var i = 0; i < pastsearches.length; i++){
        var citysearchEl = document.createElement('button');
        citysearchEl.setAttribute("class", "btn");
        citysearchEl.textContent = pastsearches[i];
        citysearchEl.setAttribute("value", pastsearches[i])
        citysearchEl.onclick = function (){
            getCityInfo(this.value)
        }
        savedSearchesEl.append(citysearchEl)
    }


}
createmenu();


function getCityInfo (cityname) {

    var apiurl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid="+key;

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

//cdisplay data

var displayweather = function (data) {

    cityContainerEl.innerHTML = "";
    day2El.innerHTML = "";
    day3El.innerHTML = "";
    day4El.innerHTML = "";
    day5El.innerHTML = "";
    day6El.innerHTML = "";


    //main container
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

    //Dates for 5 day forcast
    var date2 = moment().add(1, 'days').format('MMMM Do');
    var dateEl = document.createElement("p");
    dateEl.innerHTML = date2
    day2El.append(dateEl)

    var date3 = moment().add(2, 'days').format('MMMM Do');
    var date3El = document.createElement("p");
    date3El.innerHTML = date3
    day3El.append(date3El)

    var date4 = moment().add(3, 'days').format('MMMM Do');
    var date4El = document.createElement("p");
    date4El.innerHTML = date4
    day4El.append(date4El)

    var date5 = moment().add(4, 'days').format('MMMM Do');
    var date5El = document.createElement("p");
    date5El.innerHTML = date5
    day5El.append(date5El)

    var date6 = moment().add(5, 'days').format('MMMM Do');
    var date6El = document.createElement("p");
    date6El.innerHTML = date6
    day6El.append(date6El)

    //description for 5 day forecast

    var description2 = data.list[8].weather[0].description
    var description2El = document.createElement("p");
    description2El.innerHTML = description2
    day2El.append(description2El)

    var description3 = data.list[16].weather[0].description
    var description3El = document.createElement("p");
    description3El.innerHTML = description3
    day3El.append(description3El)

    var description4 = data.list[24].weather[0].description
    var description4El = document.createElement("p");
    description4El.innerHTML = description4
    day4El.append(description4El)

    var description5 = data.list[32].weather[0].description
    var description5El = document.createElement("p");
    description5El.innerHTML = description5
    day5El.append(description5El)

    var description6 = data.list[39].weather[0].description
    var description6El = document.createElement("p");
    description6El.innerHTML = description6
    day6El.append(description6El)


    //temp for 5 day forecast

    var temp2 = kelvintofah(data.list[8].main.feels_like)
    var temp2El = document.createElement("p");
    temp2El.innerHTML = "Temp: " + Math.round(temp2) + " F" ;
    day2El.append(temp2El)

    var temp3 = kelvintofah(data.list[16].main.feels_like)
    var temp3El = document.createElement("p");
    temp3El.innerHTML = "Temp: " + Math.round(temp3) + " F" ;
    day3El.append(temp3El)
    
    var temp4 = kelvintofah(data.list[24].main.feels_like)
    var temp4El = document.createElement("p");
    temp4El.innerHTML = "Temp: " + Math.round(temp4) + " F" ;
    day4El.append(temp4El)

    var temp5 = kelvintofah(data.list[32].main.feels_like)
    var temp5El = document.createElement("p");
    temp5El.innerHTML = "Temp: " + Math.round(temp5) + " F" ;
    day5El.append(temp5El)

    var temp6 = kelvintofah(data.list[39].main.feels_like)
    var temp6El = document.createElement("p");
    temp6El.innerHTML = "Temp: " + Math.round(temp6) + " F" ;
    day6El.append(temp6El)
    
    //wind for 5 day forecast

    var wind2 = data.list[8].wind.speed
    var wind2El = document.createElement("p");
    wind2El.innerHTML = "Wind: " + wind2 + " MPH"
    day2El.append(wind2El)

    var wind3 = data.list[16].wind.speed
    var wind3El = document.createElement("p");
    wind3El.innerHTML = "Wind: " + wind3 + " MPH"
    day3El.append(wind3El)

    var wind4 = data.list[24].wind.speed
    var wind4El = document.createElement("p");
    wind4El.innerHTML = "Wind: " + wind4 + " MPH"
    day4El.append(wind4El)

    var wind5 = data.list[32].wind.speed
    var wind5El = document.createElement("p");
    wind5El.innerHTML = "Wind: " + wind5 + " MPH"
    day5El.append(wind5El)

    var wind6 = data.list[39].wind.speed
    var wind6El = document.createElement("p");
    wind6El.innerHTML = "Wind: " + wind6 + " MPH"
    day6El.append(wind6El)

    //humidity for 5 day forecast

    var humidity2 = data.list[8].main.humidity
    var humidity2El = document.createElement("p");
    humidity2El.innerHTML = "Humidity: " + humidity2 + "%"
    day2El.append(humidity2El)

    var humidity3 = data.list[16].main.humidity
    var humidity3El = document.createElement("p");
    humidity3El.innerHTML = "Humidity: " + humidity3 + "%"
    day3El.append(humidity3El)

    var humidity4 = data.list[24].main.humidity
    var humidity4El = document.createElement("p");
    humidity4El.innerHTML = "Humidity: " + humidity4 + "%"
    day4El.append(humidity4El)

    var humidity5 = data.list[32].main.humidity
    var humidity5El = document.createElement("p");
    humidity5El.innerHTML = "Humidity: " + humidity5 + "%"
    day5El.append(humidity5El)

    var humidity6 = data.list[39].main.humidity
    var humidity6El = document.createElement("p");
    humidity6El.innerHTML = "Humidity: " + humidity6 + "%"
    day6El.append(humidity6El)

} 
 
var kelvintofah = function (K) {
   return 1.8*(K-273) + 32 
    
}


//Local storage
function saveLastSearchedCity(cityname) {
    if(pastsearches.indexOf(cityname)=== -1) {
        pastsearches.unshift(cityname)
        localStorage.setItem('lastSearchedCity', JSON.stringify(pastsearches));
    }
   createmenu();
 }


function getLastSearchedCity() {
    return localStorage.getItem('lastSearchedCity');
}


userFormEl.addEventListener("submit", formSubmitHandler);