import './App.css';
import { AirFlow, Celsius, Container, CurrentWeather, Description, Location, Rain, Refresh, Temperature, WeatherCard } from './customize';
import React from 'react';
import { ReactComponent as DayCloudyIcon } from './images/day-cloudy.svg'
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg'
import { ReactComponent as RainIcon } from './images/rain.svg'
import { ReactComponent as RefreshIcon } from './images/refresh.svg'

function App() {
  return (
    <Container>
      <WeatherCard>
        <Location theme='dark'>Taipei City</Location>
        <Description>Cloudy</Description>
        <CurrentWeather>
          <Temperature>
            23<Celsius>°C</Celsius>
          </Temperature>
          <DayCloudyIcon />
        </CurrentWeather>
        <AirFlow>23 m/h</AirFlow>
        <Rain>48%</Rain>
        <Refresh> Last Time: Am 12:03</Refresh>
      </WeatherCard>
    </Container>
  );
}

export default App;
