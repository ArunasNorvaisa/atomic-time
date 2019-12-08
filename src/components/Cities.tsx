import React from 'react';

import {getTime} from '../functions/functions';
import {options} from '../functions/options';

import './Cities.css';

interface Props {
  diff: number;
}

interface City {
  name: string;
  timezone: string;
}

function Cities(props: Props): React.ReactElement {
  const citiesArray: Array<City> = [
    {name: 'Los Angeles', timezone: 'America/Los_Angeles'},
    {name: 'New York', timezone: 'America/New_York'},
    {name: 'GMT / UTC', timezone: 'UTC'},
    {name: 'New Delhi', timezone: 'Asia/Kolkata'},
    {name: 'Hong Kong', timezone: 'Asia/Hong_Kong'},
    {name: 'Kyoto', timezone: 'Asia/Tokyo'},
    {name: 'Fiji', timezone: 'Pacific/Fiji'},
    {name: 'Chatham Islands, NZ', timezone: 'Pacific/Chatham'}
  ];

  const cityTime = (city: City): React.ReactElement => {
    const timezone: object = {timeZone: city.timezone};
    const optionsTime: object = {
      ...(options.time.withoutSeconds as object),
      ...timezone
    };
    const optionsDate: Object = {
      ...(options.date.YMD as object),
      ...timezone
    };
    return (
      <div className="cityContainer" key={city.name}>
        <div className="cityName">{city.name}</div>
        <div className="cityDateTime">
          <span className="cityTime">{getTime(optionsTime, props.diff)}</span>
          <span className="cityDate">{getTime(optionsDate, props.diff)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="citiesContainer">
      {citiesArray.map(city => cityTime(city))}
    </div>
  );
}

export default Cities;
