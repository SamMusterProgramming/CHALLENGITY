import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export async function registerForPushNotificationsAsync() {

  try {

    if (!Device.isDevice) {
      console.log('Real device required');
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {

      const { status } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId;

    if (!projectId) {
      console.log('Missing projectId');
      return;
    }

    const tokenData =
      await Notifications.getExpoPushTokenAsync({
        projectId,
      });

    console.log(
      'PUSH TOKEN:',
      tokenData.data
    );

    return tokenData.data;

  } catch (err) {

    console.log(
      'NOTIFICATION ERROR:',
      err
    );
  }
}