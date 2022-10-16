import './App.css';
import { Container, theme } from './customize';
import React, { useEffect, useState, useMemo } from 'react';
import { ThemeProvider } from '@emotion/react';
import { findLocation, getMoment } from './utils/helpers';
import WeatherCard from './views/WeatherCard';
import useWeatherAPI from './lib/useWeatherAPI';
import WeatherSetting from './views/WeatherSeeting';

const App = () => {
  const [currentCity, setCurrentCity] = useState(() => localStorage.getItem('cityName') || '臺北市');
  const [currentPage, setCurrentPage] = useState('WeatherCard');
  const [currentTheme, setCurrentTheme] = useState('light');

  const handleCurrentPageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleCurrentCityChange = (currentCity) => {
    setCurrentCity(currentCity);
  };

  const currentLocation = useMemo(() => findLocation(currentCity), [
    currentCity,
  ]);
  const { cityName, locationName, sunriseCityName } = currentLocation;
  const moment = useMemo(() => getMoment(sunriseCityName), [sunriseCityName]);
  const [weatherElement, fetchData] = useWeatherAPI({
    locationName,
    cityName,
  });

  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark');
  }, [moment]);


  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === 'WeatherCard' && (
          <WeatherCard
            cityName={cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            handleCurrentPageChange={handleCurrentPageChange}
          />
        )}

        {currentPage === 'WeatherSetting' && (
          <WeatherSetting
            cityName={cityName}
            handleCurrentCityChange={handleCurrentCityChange}
            handleCurrentPageChange={handleCurrentPageChange}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;