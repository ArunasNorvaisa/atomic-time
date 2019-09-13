import React from 'react';

import { getTime } from '../functions/functions';
import { options } from '../functions/options';

import './Cities.css';

function Cities(props: any) {

  const cities = [
    {name: 'Los Angeles', timezone: 'America/Los_Angeles'},
    {name: 'New York',    timezone: 'America/New_York'},
    {name: 'GMT / UTC',   timezone: 'UTC'},
    {name: 'Rome',        timezone: 'Europe/Rome'},
    {name: 'New Delhi',   timezone: 'Asia/Kolkata'},
    {name: 'Hong Kong',   timezone: 'Asia/Hong_Kong'},
    {name: 'Kyoto',       timezone: 'Asia/Tokyo'},
    {name: 'Fiji',        timezone: 'Pacific/Fiji'}
  ];

  const cityTime = (city: any) => {
    const timezone: Object = { timeZone: city.timezone as string };
    const optionsTime: Object = { ...options.time.withoutSeconds as Object, ...timezone };
    const optionsDate: Object = { ...options.date.YMD as Object, ...timezone };
    return <div className='cityContainer' key={city.name as string}>
      <div className='cityName'>{city.name as string}</div>
      <div className='cityDateTime'>
        <span className='cityTime'>{getTime(optionsTime, props.diff)}</span>
        <span className='cityDate'>{getTime(optionsDate, props.diff)}</span>
      </div>
    </div>;
  };

  return <div className='citiesContainer'>
    {cities.map(city => cityTime(city))}
  </div>;
}

export default Cities;
