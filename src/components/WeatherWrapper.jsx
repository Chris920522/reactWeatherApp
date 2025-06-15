import CitySelect from "./CitySelect";
import WeatherState from "./weatherState";
import { useState } from "react";

function WeatherWrapper() {
  const [selectedCity, setSelectedCity] = useState("Taipei");
  return (
    <>
      <div className="wrapper">
        <h1>天氣狀況</h1>
         <CitySelect selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        <WeatherState selectedCity={selectedCity} />
      </div>
    </>
  )
}

export default WeatherWrapper;