import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogle = () => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
  });
};