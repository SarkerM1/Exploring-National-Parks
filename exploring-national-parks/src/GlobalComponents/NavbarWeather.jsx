
import React, { useEffect, useState } from 'react';

const NavbarWeather = () => {
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        const fetchTemperature = async () => {
            try {
                const lat = 39.951061;
                const lon = -75.165619;
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e037792b7fc837ca0d4efd6d47a3671e`); // Replace with your API URL
                const data = await response.json();
                var t = ((data.main.temp - 273.15) * 1.8) + 32
                setTemperature(t.toFixed(2)); // Adjust based on your API response
            } catch (error) {
                console.error("Error fetching temperature:", error);
            }
        };

        fetchTemperature();
    }, []);

    if (temperature === null) {
        return <span>Loading...</span>; // Show a loading state while fetching
    }

    return <span className="temperature">{temperature} °F</span>;
};

export default NavbarWeather;
