import './App.css';
import { AirFlow, Celsius, Container, CurrentWeather, Description, Location, Rain, Refresh, Temperature, WeatherCard, theme } from './customize';
import React, { useEffect, useState } from 'react';
import { ReactComponent as DayCloudyIcon } from './images/day-cloudy.svg';
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg'
import { ReactComponent as RainIcon } from './images/rain.svg'
import { ReactComponent as RefreshIcon } from './images/refresh.svg'
import { ReactComponent as LoadingIcon } from './images/loading.svg'
import { ThemeProvider } from '@emotion/react';
import dayjs from 'dayjs';

const AUTHORIZATION_KEY = 'CWB-C97A27F2-1A35-4A31-BE79-C41917583585';
const LOCATION_NAME = '臺北';

function App() {
  const [currentTheme, setCurrentTheme] = useState(theme.light);
  const [currentWeather, setCurrentWeather] = useState({
    locationName: '台北市',
    description: '多雲時晴',
    windSpeed: 1.1,
    temperature: 22.9,
    rainPossibility: 48.3,
    observationTime: '2020-12-12 22:10:00',
    isLoading: true,
  })

  const fetchCurrentWeather = () => {
    setCurrentWeather((pervState) => ({
      ...pervState,
      isLoading: true,
    }));
    fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME}`)
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
        if(['WDSD', 'TEMP'].includes(item.elementName)) {
          neededElements[item.elementName] = item.elementValue;
        }
        return neededElements;
      }, {})
      setCurrentWeather({
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        description: '多雲時晴',
        rainPossibility: 60,
        isLoading: false,
      })
    });
  };

  useEffect(() => {
    fetchCurrentWeather();
  }, []);
  console.log(currentWeather.isLoading);
  return (
    <ThemeProvider theme={currentTheme}>
      <Container>
        <WeatherCard>
          <Location>{currentWeather.locationName}</Location>
          <Description>{currentWeather.description}</Description>
          <CurrentWeather>
            <Temperature>
              {Math.round(currentWeather.temperature)}<Celsius>°C</Celsius>
            </Temperature>
            <DayCloudyIcon />
          </CurrentWeather>
          <AirFlow><AirFlowIcon />{currentWeather.windSpeed} m/h</AirFlow>
          <Rain><RainIcon />{Math.round(currentWeather.rainPossibility)}%</Rain>
          <Refresh onClick={fetchCurrentWeather} isLoading={currentWeather.isLoading}> 最後觀測時間: {new Intl.DateTimeFormat('zh-TW', {
            hour: 'numeric',
            minute: 'numeric',
          }).format(dayjs(currentWeather.observationTime))}
          {currentWeather.isLoading ? <LoadingIcon /> : <RefreshIcon />}
          </Refresh>
        </WeatherCard>
      </Container>
    </ThemeProvider>
  );
}

export default App;
