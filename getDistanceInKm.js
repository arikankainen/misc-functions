const locations = [
  { longitude: 24.92376, latitude: 60.20738 },
  { longitude: 24.92412, latitude: 60.20732 },
  { longitude: 24.92437, latitude: 60.20728 },
  { longitude: 24.92504, latitude: 60.20718 },
  { longitude: 24.92576, latitude: 60.2071 },
  { longitude: 24.92604, latitude: 60.20706 },
  { longitude: 24.92605, latitude: 60.20706 },
  { longitude: 24.92628, latitude: 60.20702 },
  { longitude: 24.92634, latitude: 60.20702 },
  { longitude: 24.9264, latitude: 60.20701 },
  { longitude: 24.92688, latitude: 60.20696 },
  { longitude: 24.92811, latitude: 60.20684 },
  { longitude: 24.92813, latitude: 60.20684 },
  { longitude: 24.92815, latitude: 60.20684 },
  { longitude: 24.92818, latitude: 60.20683 },
  { longitude: 24.9282, latitude: 60.20683 },
  { longitude: 24.92838, latitude: 60.20681 },
  { longitude: 24.92845, latitude: 60.20681 },
  { longitude: 24.92871, latitude: 60.20678 },
  { longitude: 24.92955, latitude: 60.20667 },
  { longitude: 24.93, latitude: 60.20661 },
  { longitude: 24.93033, latitude: 60.20658 },
  { longitude: 24.93034, latitude: 60.20658 },
  { longitude: 24.93068, latitude: 60.20654 },
  { longitude: 24.93088, latitude: 60.20652 },
  { longitude: 24.93161, latitude: 60.20645 },
  { longitude: 24.93215, latitude: 60.20642 },
  { longitude: 24.93256, latitude: 60.2064 },
  { longitude: 24.93297, latitude: 60.20638 },
  { longitude: 24.9331, latitude: 60.20637 },
  { longitude: 24.93321, latitude: 60.20637 },
  { longitude: 24.93328, latitude: 60.20637 },
  { longitude: 24.93351, latitude: 60.20636 },
  { longitude: 24.93366, latitude: 60.20636 },
  { longitude: 24.93389, latitude: 60.20636 },
  { longitude: 24.93409, latitude: 60.20636 },
  { longitude: 24.93434, latitude: 60.20637 },
  { longitude: 24.93474, latitude: 60.20638 },
  { longitude: 24.93525, latitude: 60.2064 },
  { longitude: 24.93563, latitude: 60.20643 },
  { longitude: 24.93608, latitude: 60.20648 },
  { longitude: 24.93629, latitude: 60.20651 },
  { longitude: 24.93633, latitude: 60.20651 },
  { longitude: 24.93636, latitude: 60.20651 },
  { longitude: 24.93644, latitude: 60.20652 },
  { longitude: 24.93656, latitude: 60.20654 },
  { longitude: 24.93708, latitude: 60.20661 },
  { longitude: 24.93763, latitude: 60.20669 },
  { longitude: 24.93809, latitude: 60.20678 },
  { longitude: 24.93837, latitude: 60.20684 },
  { longitude: 24.93852, latitude: 60.20688 },
  { longitude: 24.93891, latitude: 60.20699 },
  { longitude: 24.93929, latitude: 60.20711 },
  { longitude: 24.93947, latitude: 60.20717 },
  { longitude: 24.93994, latitude: 60.20734 },
  { longitude: 24.94034, latitude: 60.2075 },
  { longitude: 24.94071, latitude: 60.20766 },
  { longitude: 24.94087, latitude: 60.20771 },
  { longitude: 24.9414, latitude: 60.20787 },
  { longitude: 24.94217, latitude: 60.20809 },
  { longitude: 24.94351, latitude: 60.20838 },
  { longitude: 24.94382, latitude: 60.20842 },
  { longitude: 24.94429, latitude: 60.20848 },
  { longitude: 24.94516, latitude: 60.20854 },
  { longitude: 24.94515, latitude: 60.20844 },
  { longitude: 24.94524, latitude: 60.20809 },
  { longitude: 24.94526, latitude: 60.20786 },
  { longitude: 24.94527, latitude: 60.2076 },
  { longitude: 24.94525, latitude: 60.20735 },
  { longitude: 24.94525, latitude: 60.207 },
  { longitude: 24.94524, latitude: 60.20685 },
  { longitude: 24.9452, latitude: 60.20556 },
  { longitude: 24.94518, latitude: 60.20521 },
];

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

const getTotalDistanceInKm = (arrayOfLocations) => {
  let totalDistanceInKm = 0;

  for (let i = 1; i < arrayOfLocations.length; i++) {
    const origin = arrayOfLocations[i - 1];
    const destination = arrayOfLocations[i];
    const distanceBetweenPoints = getDistanceInKm(origin, destination);
    totalDistanceInKm += distanceBetweenPoints;
  }

  return totalDistanceInKm;
};

const getRouteCenterLocation = (arrayOfLocations) => {
  const totalDistanceInKm = getTotalDistanceInKm(arrayOfLocations);
  const halfDistanceInKm = totalDistanceInKm / 2;

  let tempDistanceInKm = 0;
  let centerLocation = { latitude: 0, longitude: 0 };

  for (let i = 1; i < arrayOfLocations.length; i++) {
    const origin = arrayOfLocations[i - 1];
    const destination = arrayOfLocations[i];

    const distanceBetweenPoints = getDistanceInKm(origin, destination);
    tempDistanceInKm += distanceBetweenPoints;

    if (tempDistanceInKm >= halfDistanceInKm) {
      centerLocation = {
        latitude: arrayOfLocations[i].latitude,
        longitude: arrayOfLocations[i].longitude,
      };

      break;
    }
  }

  return centerLocation;
};

console.log("totalDistanceInKm", getTotalDistanceInKm(locations));
console.log("routeCenterLocation", getRouteCenterLocation(locations));
