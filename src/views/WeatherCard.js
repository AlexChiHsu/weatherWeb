import dayjs from 'dayjs';
import { ReactComponent as AirFlowIcon } from './../images/airFlow.svg';
import { ReactComponent as RainIcon } from './../images/rain.svg';
import { ReactComponent as RefreshIcon } from './../images/refresh.svg';
import { ReactComponent as LoadingIcon } from './../images/loading.svg';
import { AirFlow, Celsius, CurrentWeather, Description, Location, Rain, Refresh, Temperature, WeatherCardWrapper, Cog } from '../customize.js';
import WeatherIcon from '../WeatherIcon';

const WeatherCard = ({
  weatherElement,
  moment,
  fetchData,
  handleCurrentPageChange,
  cityName,
}) => {
  const {
    observationTime,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElement;

  return (
    <WeatherCardWrapper>
      <Cog onClick={() => handleCurrentPageChange('WeatherSetting')} />
      <Location>{cityName}</Location>
      <Description>
        {description} {comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)} <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon weatherCode={weatherCode} moment={moment} />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon /> {windSpeed} m/h
      </AirFlow>
      <Rain>
        <RainIcon /> {rainPossibility}%
      </Rain>
      <Refresh onClick={fetchData} isLoading={isLoading}>
        最後觀測時間：
        {new Intl.DateTimeFormat('zh-TW', {
          hour: 'numeric',
          minute: 'numeric',
        }).format(dayjs(observationTime))}{' '}
        {isLoading ? <LoadingIcon /> : <RefreshIcon />}
      </Refresh>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;