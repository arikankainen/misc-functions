// https://en.wikipedia.org/wiki/Haversine_formula

const getDistanceInKm = (origin, destination) => {
  const EARTH_RADIUS_IN_KM = 6371;
  const latitudeDistance = degreesToRadians(destination.latitude - origin.latitude);
  const longitudeDistance = degreesToRadians(destination.longitude - origin.longitude);

  // prettier messes up following formula, so it's ignored
  // prettier-ignore
  const haversineFormula =
    Math.sin(latitudeDistance / 2) *
    Math.sin(latitudeDistance / 2) +
    Math.cos(degreesToRadians(origin.latitude)) *
    Math.cos(degreesToRadians(destination.latitude)) *
    Math.sin(longitudeDistance / 2) *
    Math.sin(longitudeDistance / 2);

  const c = 2 * Math.atan2(Math.sqrt(haversineFormula), Math.sqrt(1 - haversineFormula));
  const distanceInKm = EARTH_RADIUS_IN_KM * c;

  return distanceInKm;
};

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

const origin = {
  latitude: 60.191193,
  longitude: 24.925344,
};

const destination = {
  latitude: 60.190665,
  longitude: 24.927683,
};

const distance = getDistanceInKm(origin, destination);

console.log(distance);
