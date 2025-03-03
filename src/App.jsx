import { useState } from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [city, setCity] = useState("");
  const [weatherIcon, setIcon] = useState("01d");

  const API_KEY = "69f256cf662a086cbf1c26ac9c605bf4";

  const fetchWeather = async () => {
    if (!search) {
      return;
    }
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
      );

      console.log(data);

      setTemperature(data.main.temp);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setCity(data.name);
      setIcon(data.weather[0].icon);
    } catch (err) {
      console.log(err);
      setCity("City not Found");
      setTemperature(null);
      setHumidity(null);
      setWindSpeed(null);
      setIcon("01d");
    }
    setSearch(""); // Clear input after fetching
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
      {/* Search Box */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 mb-6 w-full max-w-sm shadow-lg">
        <input
          type="text"
          placeholder="Search the weather"
          value={search}
          className="flex-1 outline-none px-2 text-base text-black"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="w-16 py-2 px-2 bg-black text-white  rounded-full text-sm"
          onClick={fetchWeather}>
          Search
        </button>
      </div>

      {/* Weather Image */}
      <img
        src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
        alt="Weather Icon"
        className="w-24 h-24 mb-4"
      />

      {/* Temperature & City */}
      {city && (
        <>
          <h1 className="text-4xl font-bold text-white">
            {temperature !== null ? `${temperature}°C` : "--"}
          </h1>
          <h2 className="text-2xl font-semibold text-yellow-300 mt-2">
            {city}
          </h2>
        </>
      )}

      {/* Humidity & Wind Speed */}
      <div className="flex flex-wrap justify-center gap-8 mt-6">
        <div className="flex flex-col items-center">
          <WiHumidity className="text-5xl text-cyan-300" />
          <span className="text-2xl font-semibold">
            {humidity !== null ? `${humidity}%` : "--"}
          </span>
          <p className="text-lg">Humidity</p>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind className="text-5xl text-green-300" />
          <span className="text-2xl font-semibold">
            {windSpeed !== null ? `${windSpeed} K/m` : "--"}
          </span>
          <p className="text-lg">Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default App;
