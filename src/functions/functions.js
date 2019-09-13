import axios from 'axios';

export const getTime = (options, diff, locale = 'lt-LT') => {
  const time = new Date(Date.now() - diff);
  return time.toLocaleString(locale, options);
};

export const getAsync = async url => {
  try {
    const resp = await axios(url);
    return resp.data;
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.warn(error.response.data);
      console.warn(error.response.status);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.warn(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.warn('Error', error.message);
    }
  }
};