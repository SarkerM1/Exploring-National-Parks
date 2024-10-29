
import React, { useEffect, useState } from 'react';

const ParkWeather = ({city, stateCode}) => {
    const [temperature, setTemperature] = useState(null);
    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;;

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${API_KEY}`);
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${stateCode},us&appid=e037792b7fc837ca0d4efd6d47a3671e`);
                const data = await response.json();

                if (data.coord) {
                    const lat = data.coord.lat;
                    const lon = data.coord.lon;
                    fetchTemperature(lat, lon);
                } else {
                    console.error("Invalid response data:", data);
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };
        const fetchTemperature = async (lat, lon) => {
            try {
                // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e037792b7fc837ca0d4efd6d47a3671e`);
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


        if(city && stateCode){
            fetchCoordinates();
        }
    }, [city, stateCode, API_KEY]);

    if (temperature === null || city === null) {
        return <span>Loading...</span>; // Show a loading state while fetching
    }

    return (
    <div>
        <span className="temperaturePark">{temperature} °F</span>
    </div>
    );
};

export default ParkWeather;
