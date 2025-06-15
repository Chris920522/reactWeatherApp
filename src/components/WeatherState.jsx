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

const weatherConditionMap = {
  Clear: "晴朗",
  Clouds: "多雲",
  Drizzle: "毛毛雨",
  Rain: "下雨",
  Snow: "下雪",
  Mist: "薄霧",
  Fog: "霧",
  Thunderstorm: "雷雨",
  Haze: "霾",
  Smoke: "煙霧",
  Dust: "沙塵",
  Sand: "沙塵",
  Ash: "火山灰",
  Squall: "狂風",
  Tornado: "龍捲風",
};

//城市座標
const cityCoordinates = {
  Taipei: { lat: 25.0330, lon: 121.5654 },
  Tokyo: { lat: 35.6895, lon: 139.6917 },
  NewYork: { lat: 40.7128, lon: -74.0060 },
  London: { lat: 51.5072, lon: -0.1276 },
  Paris: { lat: 48.8566, lon: 2.3522 },
};

function WeatherState({ selectedCity }) {
  const [weatherCondition, setWeatherCondition] = useState(''); //天氣狀態變化
  const [loading, setLoading] = useState(true);

  const API_KEY = '4e58aa80547c3de395320c706693d7b7';

  useEffect(() => {
    console.log("目前選擇城市：", selectedCity);
    const { lat, lon } = cityCoordinates[selectedCity];
    console.log("座標：", lat, lon);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const condition = data.weather[0].main;
        console.log("API 回傳天氣狀態:", condition);
        console.log("API完整資料:", data)
        setWeatherCondition(condition);
        setLoading(false);
      })
      .catch((error) => {
        console.error("發生錯誤", error);
        setLoading(false);
      });
  }, [selectedCity]);

  const icon = weatherIcons[weatherCondition] || cloudIcon;
  // 先用 weatherCondition（API 回傳的天氣英文狀態）去查 weatherIcons 對照表，取得對應的圖示。
  // 如果查得到（例如 Clear 會對應到晴天圖示），就顯示對應圖示。
  // 如果查不到（對照表沒有這個天氣狀態），就顯示預設的 cloudIcon（多雲圖示）。

  return (
    <div className="state mt-4">
      {loading ? (
        <p>載入中...</p>
      ) : (
        <>
          <img src={icon} alt={weatherCondition} className="w-24 h-24" />
          <p>{weatherConditionMap[weatherCondition] || weatherCondition}</p>
          {/* 優先顯示中文，沒有對應時顯示英文 */}
        </>
      )}
    </div>
  );
}

export default WeatherState;
