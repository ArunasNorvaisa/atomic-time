export const options = {
  time: {
    withSeconds: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    },
    withoutSeconds: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }
  },
  date: {
    YMD: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    },
    weekday: {
      weekday: 'long'
    }
  },
  geolocation: {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  }
};
