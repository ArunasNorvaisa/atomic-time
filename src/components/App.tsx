import React, { useEffect, useRef, useState } from 'react';

import { getTime, getAsync } from '../functions/functions';
import { options } from '../functions/options';
import Cities from './Cities';
import Spinner from './Spinner';

import './App.css';

function App() {
  const [diff, setDiff] = useState<number>(0);
  const [time, setTime] = useState<string>('');
  const [coords, setCoords] = useState<any>({lat: 0, lng: 0});
  const [city, setCity] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const firstUpdate1 = useRef<boolean>(true);
  const firstUpdate2 = useRef<boolean>(true);

  useEffect(() => {
    getTimeDiff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = `${getTime(options.time.withoutSeconds, diff)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    // We use below check so this effect will not run during the first update
    if (firstUpdate1.current) {
      firstUpdate1.current = false;
      return;
    }
    exactTime();
    // console.log('L37 diff ===', diff);
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options.geolocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diff]);

  useEffect(() => {
    // We use below check so this effect will not run during the first update
    if (firstUpdate2.current) {
      firstUpdate2.current = false;
      return;
    }
    getCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  const getTimeDiff = async () => {
    const resp = await getAsync('https://worldtimeapi.org/api/ip');
    // console.time('ms');
    const atomTime: number = new Date(resp.datetime as string).getTime();
    const PCTime: number = Date.now();
    const difference: number = PCTime - atomTime;
    setDiff(difference);
    // console.timeEnd('ms');
};

  const exactTime = () => {
    setTime(getTime(options.time.withSeconds as Object, diff));
    requestAnimationFrame(exactTime);
  };

  const geoSuccess = (pos: any) => {
    const crd = pos.coords;
    setCoords({lat: crd.latitude, lng: crd.longitude});
  };

  const geoError = (err: any) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const getCity = async () => {
    const resp = await getAsync(`https://geocode.xyz/${coords.lat},${coords.lng}?json=1`);
    setCity(resp.alt.loc[0].city || resp.city);
    setLoaded(true);
  };

  return !loaded ?
    <Spinner type={'spokes'} color={'#fff'} /> :
    <div className='container'>
      <h1 className='cityName'>Local atomic time in {city}:</h1>
      <h1 className='localTime'>{time}</h1>
      <Cities diff={diff} />
    </div>
}

export default App;
