import React, { useState ,useEffect   } from "react";
import axios from "axios";
import seacrh_icon from "./pic/search.png";
import Daytime from "./components/Daytime";
import cloud_icon from "./pic/cloud.png";
import humidity_icon from "./pic/humidity.png";
import wind_icon from "./pic/wind.png";

const WeatherApp = () => {

  const [color ,setColor] = useState("white")
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const[wicon,setWicon]= useState(cloud_icon);
  console.log("WeatherApp");

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey;
    axios.get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
   
    getWetherDetails();
  }, []);



  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  function getRandomColor(){
    let letter = '0133456789abcdef'
    let color = '#'
    for(let i = 0;i<6; i++){
      color += letter[Math.floor(Math.random() * 16)]
      
    }
    return color;
  }

  const handleSearch = (e) => {
   const body = document.querySelector("body")
   body.style.background= getRandomColor()

    getWetherDetails(inputCity);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          onChange={handleChangeInput}
          value={inputCity}
          placeholder="city_name"
        />
        <div
          className="search_icon"
          onClick={handleSearch}
        >
          <img className="search1" src={seacrh_icon} alt="no iamge" />
        </div>
      </div>

      
      {Object.keys(data).length > 0 && (
        <div className="box">
        <div className="weatherImage">
        <img className="mainpic" src={wicon} alt="" /> 
      </div>
      <div className="weather-location">{data?.name}</div>
      <div className="weather-temp"> {(data?.main?.temp - 273.15).toFixed(2)}°C</div>
      <div className="element">
      
      <div className="ele1"><img src={humidity_icon} alt="no pic " />{data?.main?.humidity}%npm  Humidity</div>
     
      <div className="ele2"><img   src={wind_icon} alt="" /><br />{data?.wind?.speed} km/h <br />Wind Speed
      </div>
      
      </div>
      <Daytime/>
        </div>
      )}

    </div>
  );
};

export default WeatherApp;
