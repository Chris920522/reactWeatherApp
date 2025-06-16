import { useState } from "react";
import searchIcon from '../assets/search.png';

function CitySelect({ setSelectedCity }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      setSelectedCity(inputValue.trim());
      setInputValue(inputValue.trim());
      setInputValue("");
    }
  };
//   trim() 避免空白字元誤觸。
// 呼叫 setSelectedCity() 把城市名稱傳到父元件。
// 這樣父層的 WeatherState 才能因為 selectedCity 改變而重新發 API。



  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="輸入城市（例如 Tokyo）"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="searchBar"
      />
      {/* inputValue 是 useState 綁定的文字輸入狀態。
      每次輸入都更新 inputValue。
      當按下 Enter (handleKeyDown) 或點擊按鈕，就會執行 handleSearch()。 */}
      <button onClick={handleSearch}>
        <img src={searchIcon} alt="Search" className="w-6 h-6" />
      </button>
    </>
  );
}

export default CitySelect;
