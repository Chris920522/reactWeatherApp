import { useEffect, useState } from "react";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import humidityIcon from "../assets/humidity.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";

const weatherIcons = {
  Clear: clearIcon,
  Clouds: cloudIcon,
  Drizzle: drizzleIcon,
  Rain: rainIcon,
  Snow: snowIcon,
  Humidity: humidityIcon,
  Wind: windIcon,
};

function WeatherState({ selectedCity }) {
  const [weatherCondition, setWeatherCondition] = useState(''); //天氣狀態
  const [loading, setLoading] = useState(true);
  const [currentHumidity, setCurrentHumidity] = useState(''); //濕度
  const [weatherMain, setWeatherMain] = useState('');//天氣圖標
  const [feelsLike, setFeelsLike] = useState('')//體感溫度

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; ;

  useEffect(() => {
      if (!selectedCity) return;
      // 防止 undefined 時就呼叫 API
  console.log("目前選擇城市：", selectedCity);

  setLoading(true);

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric&lang=zh_tw`)

//   q=城市名稱 是 OpenWeather API 支援的方式之一。
// appid=${API_KEY} 是授權金鑰（.env 變數導入）
// units=metric 代表使用「公制」單位（攝氏 °C）
//lang=zh_tw代表支援中文
    .then((res) => res.json())
    .then((data) => {
      const conditionMain = data.weather[0].main;
      const condition = data.weather[0].description;
      const humidity = data.main.humidity;
      const tem = data.main.feels_like;
      console.log("API 回傳天氣狀態:", condition);
      console.log(data);//測試用
      setWeatherCondition(condition);
      setCurrentHumidity(humidity);
      setWeatherMain(conditionMain); 
      setFeelsLike(tem);
      setLoading(false);
    })
    .catch((error) => {
      console.error("發生錯誤", error);
      setLoading(false);
    });
}, [selectedCity]);

  const icon = weatherIcons[weatherMain] || cloudIcon;
  // 先用 weatherCondition（API 回傳的天氣英文狀態）去查 weatherIcons 對照表，取得對應的圖示。
  // 如果查得到（例如 Clear 會對應到晴天圖示），就顯示對應圖示。
  // 如果查不到（對照表沒有這個天氣狀態），就顯示預設的 cloudIcon（多雲圖示）。

  return (
    <div className="state mt-4">
      {loading ? (
        <p>載入中...</p>
      ) : (
        <>
          <img src={icon} alt={weatherCondition} />
          <p>{weatherCondition }</p>
          <br />
          <p>{selectedCity}</p>
          <br />
          <p>目前體感溫度:{feelsLike}℃</p>
          <p>目前濕度:{currentHumidity}%</p>
        </>
      )}
    </div>
  );
}

export default WeatherState;
