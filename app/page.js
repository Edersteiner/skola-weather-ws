"use client";
import { getWeatherForecast } from "@/logic/data.js";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getWeatherForecast(59.3793, 13.5036)
      .then((SMHIdata) => {
        setWeatherData(SMHIdata);
      })
      .catch((error) => console.error(error));
  }, []);

  if (weatherData) {
    return (
      <div>
        <main>
          <DayView weatherItem={weatherData[0]}></DayView>
        </main>
      </div>
    );
  } else {
    <div>
      <main>
        <h1>Loading Weather Data...</h1>
      </main>
    </div>;
  }
}

export function DayView({ weatherItem }) {
  const date = new Date(weatherItem.time);
  const dayString = date.toLocaleString("sv-SE", { weekday: "long" });
  const day = dayString.charAt(0).toUpperCase() + dayString.slice(1);
  const time = date.toLocaleString("sv-SE", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="w-lvw h-3/4 flex flex-col justify-items-center justify-center items-center align-middle p-12">
      <h2 className="text-3xl font-bold">
        {day} | {time}
      </h2>
      <br></br>
      <h2 className="text-5xl font-bold ">Karlstad</h2>
      <br></br>
      <Image
        width={128}
        height={128}
        src={
          "/weather-icons/weather-icon-" +
          weatherItem.parameters.Wsymb2.value +
          ".png"
        }
        alt="weather-icon"
      />
      <br></br>
      <h1 className="text-5xl font-normal">
        {weatherItem.parameters.t.value}°C
      </h1>
    </div>
  );
}
