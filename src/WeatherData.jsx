import { useEffect, useState } from "react";
import axios from "axios";
import loader from "./assets/loader.gif";
import DayWeather from "./components/DayWeather";

const WeatherData = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    });
  }

  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=3`
      );
      const {data} = await response;
      setWeather(data['daily']);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  if (isLoading) {
      return <div className="fullscreen">
        <img src={loader} alt="loader" />
    </div>
  }
  
  const {temperature_2m_max: temp_max, temperature_2m_max: temp_min, time: dates, weathercode: codes} = weather; 
  return (
    <div className="p-relative">
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7008.780631765115!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1706155514984!5m2!1sen!2sin`}
        className="map"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="fullscreen">
        <div className="container">
            <div className="weatherScreen">
            <h1 className="main-heading">Weather Report</h1>
            <ul className="weather-list">
            {dates?.map((date, i) => {
                return <DayWeather key={i} date={date} temp_max={temp_max.at(i)} temp_min={temp_min.at(i)} code={codes.at(i)} />
            })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
