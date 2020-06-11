const notificationElement= document.querySelector('.notification');
const iconElement= document.querySelector('.weather-icon');
const tempElement= document.querySelector('.temperature-value p');
const descElement= document.querySelector('.temperature-description p');
const locationElement= document.querySelector('.location p');
const NationElement= document.querySelector('.nation p');


const weather={};
weather.temperature = {
        unit: "celsius"
    };
const kelvin = "273";
const key = "4e6098a45d2aba2c804c66395da3af69";

//LOCALIZZAZIONE
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML="<p>Il tuo browser non ha la localizzazione attiva</p>";
}

function setPosition(position){
    var latitude= position.coords.latitude;
    var longitude= position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display= "block";
    notificationElement.innerHTML="<p>OPS! IL TUO BORWSER NON HA LA LOCALIZZAZIONE ATIVA</p>";
    notificationElement.style.color='red'
} 

function getWeather(latitude, longitude){
    var api= 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&appid=4e6098a45d2aba2c804c66395da3af69&lang=it';
    
    fetch(api)
    .then(function(response){
        var data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city= data.name;
        weather.country= data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

function displayWeather(){
    iconElement.innerHTML = '<img src="images/icons/'+ weather.iconId +'.png"/>';
    tempElement.innerHTML= weather.temperature.value +'°<span>C</span>';
    descElement.innerHTML= weather.description;
    locationElement.innerHTML= weather.city;
    NationElement.innerHTML= weather.country;
};
