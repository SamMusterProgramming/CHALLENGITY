import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Keep the development URL consistent with your existing setup.
// For a physical device, replace localhost with your computer's LAN IP.
const BASE_URL_DEVELOPMENT = "http://localhost:8000";
const BASE_URL_PRODUCTION = process.env.EXPO_PUBLIC_SERVER_URL;

export const BASE_URL = BASE_URL_PRODUCTION
  // ? BASE_URL_DEVELOPMENT
  // : BASE_URL_PRODUCTION || BASE_URL_DEVELOPMENT;

export const api = axios.create({
  baseURL: BASE_URL,
});

export const setLoadingBarAxios = (loadingRef) => {
  axios.interceptors.request.use(
    async (config) => {
      loadingRef.current?.continuousStart?.();
      return config;
    },
    (error) => {
      loadingRef.current?.complete?.();
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      loadingRef.current?.complete?.();
      return response;
    },
    (error) => {
      loadingRef.current?.complete?.();
      return Promise.reject(error);
    }
  );
};

export const saveToken = async (token) => {
  await AsyncStorage.setItem("token", token);
};

export const getToken = async () => {
  return AsyncStorage.getItem("token");
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
