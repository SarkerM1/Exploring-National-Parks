
import React, { useEffect, useState } from 'react';

const NavbarWeather = ({zipCode, showCity}) => {
    const [temperature, setTemperature] = useState(null);
    const [city, setCity] = useState(null);
    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;;

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${API_KEY}`);
                const data = await response.json();

                if (data.coord) {
                    const lat = data.coord.lat;
                    const lon = data.coord.lon;
                    setCity(data.name)
                    fetchTemperature(lat, lon);
                } else {
                    console.error("Invalid response data:", data);
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };
        const fetchCurrentLocation = async () => {
            let lat;
            let lon;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        lat = position.coords.latitude;
                        lon = position.coords.longitude;
                        console.log(`Global Latitude: ${lat}, Global Longitude: ${lon}`);
                    },
                    (err) => {
                        console.error(err.message);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
                const data = await response.json();

                if (data.name) {
                    setCity(data.name)
                } else {
                    console.error("Invalid response data:", data);
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };
        const fetchTemperature = async (lat, lon) => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                const data = await response.json();

                if(data.main){
                    var t = ((data.main.temp - 273.15) * 1.8) + 32
                    setTemperature(t.toFixed(0));
                } else {
                    console.error("Invalid response data:", data)
                }
                
            } catch (error) {
                console.error("Error fetching temperature:", error);
            }
        };


        if(zipCode){
            fetchCoordinates();
        }else{
            fetchCurrentLocation();
        }
    }, [zipCode, API_KEY]);

    if (temperature === null || city === null) {
        return <span>Loading...</span>; // Show a loading state while fetching
    }

    return (
    <div>
        <span className="temperature">{temperature} °F</span>
        {showCity && <span className="city">{city}</span>}
    </div>
    );
};

export default NavbarWeather;
