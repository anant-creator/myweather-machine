export default function DayWeather(props) {
    const {date, temp_min, temp_max, code} = props;

    function getWeatherIcon(wmoCode) {
        const icons = new Map([
          [[0], "☀️"],
          [[1], "🌤"],
          [[2], "⛅️"],
          [[3], "☁️"],
          [[45, 48], "🌫"],
          [[51, 56, 61, 66, 80], "🌦"],
          [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
          [[71, 73, 75, 77, 85, 86], "🌨"],
          [[95], "🌩"],
          [[96, 99], "⛈"],
        ]);
        const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
        if (!arr) return "NOT FOUND";
        return icons.get(arr);
      }
    
    function formatDay(dateStr) {
      return new Intl.DateTimeFormat("en", {
        weekday: "short",
      }).format(new Date(dateStr));
    }

   return <li>
    <p className="icon">{getWeatherIcon(code)}</p>
    <p className="day">{date}</p>
    <p className="day">{formatDay(date)}</p>
    <p className="temp">{Math.floor(temp_min)}° C - {Math.ceil(temp_max)}° C</p>
  </li>
}

