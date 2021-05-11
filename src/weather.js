import React, {useState } from 'react';
import './App.css';



function Weather() {


  const [weather, setWeather] = useState({});
 

  const api = {
    key: "5b881f6447593d97ee91f3b5027f1e09",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  function search() {
    let state=''
    navigator.geolocation.getCurrentPosition(function(data){
      const long= data.coords.longitude;
     const lat =data.coords.latitude
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1IjoiZGV4Y2FybG9zIiwiYSI6ImNrb2hzNmd6MjBudGQybmxsMHFybjNvZW0ifQ.VTlqEeCl-zmlMFe-5_fYJQ`)
  .then(res => res.json())
  .then(data => {
     state=data.features[1].text
      fetch(`${api.base}weather?q=${state}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          console.log(result);
        });
      });
    }) 

  }

return(
<div>

  <div className="container">
  <div className="box">
  <button className="button" onClick={search}>Obtener</button>
  

  {(typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
         {weather.name}, {weather.sys.country}
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°c
          </div>
          <div className="weather">{weather.weather[0].main}</div>
          <div className="weather">{weather.weather[0].description}</div>
          <div className="weather">wind: {weather.wind.speed}</div>

        </div>
      </div>
      ) : ("")}
  </div>
</div>
</div>
);










  
}
export default Weather