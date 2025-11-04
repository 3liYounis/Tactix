import { Platform } from "react-native";

const getBaseURL = () => {
  if (Platform.OS === "android" && !__DEV__) {
    // physical Android device in production
    return "http://192.168.100.27:3000";
  }

  if (Platform.OS === "android") {
    // Android emulator
    return "http://192.168.100.27:3000";
  }

  // iOS simulator: uses host machine network directly
  return "http://YOUR_LOCAL_IP:3000";
};

export const API_CONFIG = {
  baseURL: getBaseURL(),
  endpoints: {
    createMatch: '/match/create',
    joinMatch: '/match/join'
  },
  timeout: 10000,
};
