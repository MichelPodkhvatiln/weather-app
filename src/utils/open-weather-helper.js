import moment from "moment";

function objectIsEmpty(data) {
  return (
    data && Object.entries(data).length === 0 && data.constructor === Object
  );
}

function arrayIsEmpty(data) {
  return data && !Array.isArray(data);
}

function feelLikeFormatter(data) {
  if (objectIsEmpty(data)) {
    return {};
  }

  return {
    day: data.day,
    eve: data.eve,
    morn: data.morn,
    night: data.night
  };
}

function tempFormatter(data) {
  if (objectIsEmpty(data)) {
    return {};
  }

  return {
    day: data.day,
    eve: data.eve,
    max: data.max,
    min: data.min,
    morn: data.morn,
    night: data.night
  };
}

function weatherInfoFormatter(data) {
  if (arrayIsEmpty(data)) {
    return [];
  }

  return data.map(info => {
    return {
      description: info.description,
      icon: info.icon,
      id: info.id,
      main: info.main
    };
  });
}

function infoFormatter(data, extended = false) {
  return {
    clouds: data.clouds,
    dewPoint: data.dew_point,
    dt: moment(data.dt * 1000).format("DD MMMM YYYY"),
    feelsLike: extended ? feelLikeFormatter(data.feels_like) : data.feels_like,
    humidity: data.humidity,
    pressure: data.pressure,
    sunrise: moment(data.sunrise * 1000).format("HH:mm"),
    sunset: moment(data.sunset * 1000).format("HH:mm"),
    temp: extended ? tempFormatter(data.temp) : data.temp,
    uvi: data.uvi,
    visibility: data.visibility,
    weather: weatherInfoFormatter(data.weather),
    windDeg: data.wind_deg,
    windSpeed: data
  };
}

function currentFormatter(data) {
  if (objectIsEmpty(data)) {
    return {};
  }

  return infoFormatter(data);
}

function dailyFormatter(data) {
  if (arrayIsEmpty(data)) {
    return [];
  }

  return data.map(dayData => infoFormatter(dayData, true));
}

function hourlyFormatter(data) {
  if (arrayIsEmpty(data)) {
    return [];
  }

  return data.map(hourlyData => infoFormatter(hourlyData));
}

export function responseFormatter(type, data) {
  const types = {
    current: currentFormatter,
    daily: dailyFormatter,
    hourly: hourlyFormatter
  };

  return types[type](data);
}
