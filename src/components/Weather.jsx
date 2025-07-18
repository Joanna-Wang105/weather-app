import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { Card } from "./Card";

export const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": "/images/clear_icon.png",
    "01n": "/images/clear_icon.png",
    "02d": "/images/few_clouds_icon.png",
    "02n": "/images/few_clouds_icon.png",
    "03d": "/images/scattered_clouds_icon.png",
    "03n": "/images/scattered_clouds_icon.png",
    "04n": "/images/broken_clouds_icon.png",
    "04d": "/images/broken_clouds_icon.png",
    "09n": "/images/shower_rain_icon.png",
    "09d": "/images/shower_rain_icon.png",
    "10n": "/images/rain_icon.png",
    "10d": "/images/rain_icon.png",
    "11n": "/images/thunderstorm_icon.png",
    "11d": "/images/thunderstorm_icon.png",
    "13n": "/images/snow_icon.png",
    "13d": "/images/snow_icon.png",
    "50n": "/images/mist_icon.png",
    "50d": "/images/mist_icon.png",
  };

  const search = async (city = null, lat = null, lon = null) => {
    try {
      let url = "";
      if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`;
      } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`;
      } else {
        throw new Error("City or coordinates must be provided.");
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        rain: data.rain?.["1h"] || 0,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: allIcons[data.weather[0].icon],
        description: data.weather[0].description,
      });
    } catch (e) {
      console.log(e);
      alert(`Error: Please enter valid location`);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          search(null, latitude, longitude);
        },
        (error) => {
          console.log("Geolocation error:", error);
          alert("Could not get your location. Please search manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center pt-8 px-10 rounded-2xl border border-blue-800">
        {/* search bar */}
        <div className="flex gap-3 items-center">
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-slate-300 rounded-xl pl-3 pr-8 sm:pr-28 py-2 focus:outline-none focus:border-blue-300 hover:border-slate-400 shadow-sm focus:shadow"
            placeholder="Search a location"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const city = inputRef.current.value;
                inputRef.current.value = "";

                search(city);
              }
            }}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="rounded-3xl bg-blue-100 p-3 text-gray-400 hover:text-gray-500 cursor-pointer"
            onClick={() => {
              search(inputRef.current.value);
              inputRef.current.value = "";
            }}
          />
        </div>

        <div className="flex flex-col mt-5 justify-center items-center">
          <h1 className="text-3xl font-semibold mb-5 custom-font">
            {weatherData.location}
          </h1>

          <img
            src={weatherData.icon}
            alt={weatherData.description}
            className="w-20 h-20"
          ></img>
          {/* icon */}

          <p className="text-3xl mt-2">{weatherData.temperature} ℃</p>
        </div>

        {/* card container for wind, rain, and humidity */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-3">
          <Card
            element={"Wind speed"}
            data={weatherData.windspeed}
            unit={"km/h"}
          />
          <Card element={"Rain"} data={weatherData.rain} unit={"mm"} />
          <Card element={"Humidity"} data={weatherData.humidity} unit={"%"} />
        </div>
        <div className="text-sm text-gray-500 mt-8">
          <p>
            Icons by{" "}
            <a
              href="https://www.flaticon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              Flaticon
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
