import drizzle from "../assets/images/icon-drizzle.webp";
import fog from "../assets/images/icon-fog.webp";
import overcast from "../assets/images/icon-overcast.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp"; // ← вот так
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import storm from "../assets/images/icon-storm.webp";
import sunny from "../assets/images/icon-sunny.webp";

export default function WeatherIcon({ code, className = "" }) {
  let icon = sunny;

  if (code === 0) {
    icon = sunny;
  } else if (code === 1 || code === 2) {
    icon = partlyCloudy;
  } else if (code === 3) {
    icon = overcast;
  } else if (code === 45 || code === 48) {
    icon = fog;
  } else if ([51, 53, 55, 56, 57].includes(code)) {
    icon = drizzle;
  } else if ([61, 63, 65, 80, 81, 82].includes(code)) {
    icon = rain;
  } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
    icon = snow;
  } else if (code === 95 || code === 96 || code === 99) {
    icon = storm;
  }

  return (
    <img
      src={icon}
      alt={`weather ${icon} icon`}
      className={className}
      draggable={false}
    />
  );
}
