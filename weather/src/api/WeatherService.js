import { fetchWeatherApi } from "openmeteo";

export default async function WeatherService(selectedCity) {
  if (!selectedCity) {
    throw new Error("Selected city is required");
  }

  const params = {
    latitude: selectedCity.latitude,
    longitude: selectedCity.longitude,
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "weather_code",
      "wind_speed_10m",
      "apparent_temperature",
      "precipitation",
    ],
    current: ["weather_code", "temperature_2m"],
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    timezone: selectedCity.timezone || "auto",
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  
  const response = responses[0];

  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
  );

  const current = response.current();
  const hourly = response.hourly();
  const daily = response.daily();  

  // --- CURRENT ---
  const weatherCurrent = {
    time: new Date(
      (Number(current.time()) + utcOffsetSeconds) * 1000
    ),
    weather_code: current.variables(0).value(),
    temperature_2m: current.variables(1).value(),
  };

  // --- HOURLY ---
  const hourlyTimeStart = Number(hourly.time());
  const hourlyTimeEnd = Number(hourly.timeEnd());
  const hourlyInterval = hourly.interval();

  const weatherHourly = {
    time: Array.from(
      {
        length: (hourlyTimeEnd - hourlyTimeStart) / hourlyInterval,
      },
      (_, i) =>
        new Date(
          (hourlyTimeStart + i * hourlyInterval + utcOffsetSeconds) * 1000
        )
    ),
    temperature_2m: hourly.variables(0).valuesArray(),
    relative_humidity_2m: hourly.variables(1).valuesArray(),
    weather_code: hourly.variables(2).valuesArray(),
    wind_speed_10m: hourly.variables(3).valuesArray(),
    apparent_temperature: hourly.variables(4).valuesArray(),
    precipitation: hourly.variables(5).valuesArray(),
  };

  // --- DAILY ---
  const dailyTimeStart = Number(daily.time());
  const dailyTimeEnd = Number(daily.timeEnd());
  const dailyInterval = daily.interval();

  const weatherDaily = {
    time: Array.from(
      {
        length: (dailyTimeEnd - dailyTimeStart) / dailyInterval,
      },
      (_, i) =>
        new Date(
          (dailyTimeStart + i * dailyInterval + utcOffsetSeconds) * 1000
        )
    ),
    weather_code: daily.variables(0).valuesArray(),
    temperature_2m_max: daily.variables(1).valuesArray(),
    temperature_2m_min: daily.variables(2).valuesArray(),
  };

  const weatherData = {
    latitude,
    longitude,
    elevation,
    timezone,
    utcOffsetSeconds,
    current: weatherCurrent,
    hourly: weatherHourly,
    daily: weatherDaily,    
  };

  console.log(
    `\nCurrent time: ${weatherData.current.time}\n`,
    `\nCurrent weather_code: ${weatherData.current.weather_code}`,
    `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
  );

  return weatherData;
}
