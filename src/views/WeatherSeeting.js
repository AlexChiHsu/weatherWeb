import { useState } from 'react';
import { WeatherSettingWrapper, Title, StyledLabel, ButtonGroup, Back, Save, StyledSelect } from '../customize';
import { availableLocations } from './../utils/helpers';


const WeatherSetting = ({
  cityName,
  handleCurrentCityChange,
  handleCurrentPageChange,
}) => {
  const [locationName, setLocationName] = useState(cityName);

  const handleChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleSave = () => {
    console.log(`儲存的地區資訊為：${locationName}`);
    handleCurrentCityChange(locationName);
    handleCurrentPageChange('WeatherCard');
    localStorage.setItem('cityName', locationName);
  };

  return (
    <WeatherSettingWrapper>
      <Title>設定</Title>
      <StyledLabel htmlFor="location">地區</StyledLabel>

      <StyledSelect
        id="location"
        name="location"
        onChange={handleChange}
        value={locationName}
      >
        {availableLocations.map(({ cityName }) => (
          <option value={cityName} key={cityName}>
            {cityName}
          </option>
        ))}
      </StyledSelect>

      <ButtonGroup>
        <Back onClick={() => handleCurrentPageChange('WeatherCard')}>返回</Back>
        <Save onClick={handleSave}>儲存</Save>
      </ButtonGroup>
    </WeatherSettingWrapper>
  );
};

export default WeatherSetting;