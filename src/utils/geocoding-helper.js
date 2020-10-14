function geocodingResponseIsNotOK(data) {
  return data.status !== "OK";
}

function getLocalInfo(data) {
  return data.results.find(item => item.types.includes("locality"));
}

function getFormattedAddress(data) {
  const city = data.address_components.find(component =>
    component.types.includes("locality")
  );

  const country = data.address_components.find(component =>
    component.types.includes("country")
  );

  return `${city.short_name}, ${country.short_name}`;
}

export function geocodingFormatter(data) {
  if (geocodingResponseIsNotOK(data)) {
    return {};
  }

  const info = getLocalInfo(data);

  return {
    address: getFormattedAddress(info),
    lat: info.geometry.location.lat,
    lon: info.geometry.location.lng
  };
}
