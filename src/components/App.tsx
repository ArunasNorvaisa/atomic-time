import React, { useEffect, useRef, useState } from 'react';

import { getAsync, getTime } from '../functions/functions';
import { options } from '../functions/options';
import Cities from './Cities';
import Spinner from './Spinner';

import './App.css';

interface Coords {
  lat: number;
  lng: number;
}

function App():React.ReactElement {
  const [diff, setDiff] = useState<number>(0);
  const [time, setTime] = useState<string>('');
  const [coords, setCoords] = useState<Coords>({ lat: 0, lng: 0 });
  const [city, setCity] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const firstUpdate1 = useRef<boolean>(true);
  const firstUpdate2 = useRef<boolean>(true);

  useEffect((): void => {
    getTimeDiff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    document.title = `${getTime(options.time.withoutSeconds, diff)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect((): void => {
    // We use below check so this effect will not run during the first update
    if (firstUpdate1.current) {
      firstUpdate1.current = false;
      return;
    }
    exactTime();
    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      geoError,
      options.geolocation
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diff]);

  useEffect((): void => {
    // We use below check so this effect will not run during the first update
    if (firstUpdate2.current) {
      firstUpdate2.current = false;
      return;
    }
    getCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  const getTimeDiff = async (): Promise<void> => {
    const resp = await getAsync("https://worldtimeapi.org/api/ip");
    const atomTime: number = new Date(resp.datetime as string).getTime();
    const difference: number = Date.now() - atomTime;
    setDiff(difference);
  };

  const exactTime = (): void => {
    setTime(getTime(options.time.withSeconds as Object, diff));
    requestAnimationFrame(exactTime);
  };

  const geoSuccess = (pos: any): void => {
    const crd = pos.coords;
    setCoords({ lat: crd.latitude, lng: crd.longitude });
  };

  const geoError = async (err: any): Promise<void> => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    const resp = await getAsync("https://ipwhois.app/json/");
    setCoords({ lat: resp.latitude, lng: resp.longitude });
  };

  const getCity = async (): Promise<void> => {
    const resp = await getAsync(
      `https://geocode.xyz/${coords.lat},${coords.lng}?json=1`
    );
    setCity(resp.city || resp.alt.loc[0].city);
    setLoaded(true);
  };

  return !loaded
    ? <Spinner type={'Watch'} />
    : <div className="container">
      <div className="d-flex flex-justify-content-space-between">
        <h1 className="cityName m-xl">Local atomic time in {city}:</h1>
      </div>
      <h1 className="localTime">{time}</h1>
      <Cities diff={diff} />
    </div>;
}

export default App;
