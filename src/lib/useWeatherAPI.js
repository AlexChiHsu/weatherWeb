import { useCallback, useEffect, useState } from 'react';

const weatherAPI_URI = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
const AUTHORIZATION_KEY = 'CWB-C97A27F2-1A35-4A31-BE79-C41917583585';

const fetchCurrentWeather = ({ locationName }) => {
  return fetch(
    `${weatherAPI_URI}/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&locationName=${locationName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];

      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['WDSD', 'TEMP'].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
          }
          return neededElements;
        },
        {}
      );

      return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
      };
    });
};

const fetchWeatherForecast = ({ cityName }) => {
  return fetch(
    `${weatherAPI_URI}/F-C0032-001?Authorization=${AUTHORIZATION_KEY}&locationName=${cityName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );

      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      };
    });
};


const useWeatherAPI = ({ locationName, cityName }) => {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    temperature: 0,
    windSpeed: 0,
    description: '',
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
    isLoading: true,
  });

  const fetchData = useCallback(async () => {
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const [currentWeather, weatherForecast] = await Promise.all([
      fetchCurrentWeather({ locationName }),
      fetchWeatherForecast({ cityName }),
    ]);

    setWeatherElement({
      ...currentWeather,
      ...weatherForecast,
      isLoading: false,
    });
  }, [ cityName, locationName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [weatherElement, fetchData];
};

export default useWeatherAPI;