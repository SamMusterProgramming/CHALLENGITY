import * as Location from "expo-location";

/**
 * 1. GET COORDINATES ONLY (SAFE)
 */
export const getCoordsSafe = async () => {
  try {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return null;
    }

    const coords = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      maximumAge: 0,
      timeout: 10000,
    });

    return coords.coords;
  } catch (e) {
    console.log("GPS error:", e);
    return null;
  }
};

/**
 * 2. REVERSE GEOCODE (SAFE BUT OPTIONAL)
 */
export const getCountryFromCoords = async (coords) => {
  try {
    if (!coords) return null;

    const geo = await Location.reverseGeocodeAsync(coords);

    if (!geo?.length) return null;

    return {
      country: geo[0]?.country ?? null,
      countryCode: geo[0]?.isoCountryCode ?? null,
      city: geo[0]?.city ?? null,
      region: geo[0]?.region ?? null,
    };
  } catch (e) {
    console.log("Geocode error:", e);
    return null;
  }
};

/**
 * 3. MAIN FUNCTION (USE THIS EVERYWHERE)
 * NEVER CRASHES
 */
export const getUserLocationSafe = async () => {
  try {
    const coords = await getCoordsSafe();

    // ❌ do NOT block if coords fail
    if (!coords) {
      return {
        source: "unknown",
      };
    }

    // try geocode but don't depend on it
    const geo = await getCountryFromCoords(coords);

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      country: geo?.country ?? null,
      countryCode: geo?.countryCode ?? null,
      city: geo?.city ?? null,
      region: geo?.region ?? null,
      source: "gps",
    };
  } catch (e) {
    console.log("Location system failed:", e);

    return {
      source: "error",
    };
  }
};