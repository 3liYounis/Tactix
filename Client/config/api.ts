import { Platform } from 'react-native';
const getBaseURL = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  } else {
    return 'http://localhost:3000';
  }
};

export const API_CONFIG = {
  baseURL: getBaseURL(),
  endpoints: {
    createMatch: '/match/create',
  },
  timeout: 10000,
};
