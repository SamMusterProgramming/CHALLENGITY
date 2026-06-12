import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { api } from '../apiCalls';

export async function registerForPushNotificationsAsync(userId) {
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
      // ✅ FORCE PROJECT ID (MOST IMPORTANT FIX)
      const projectId = 'cae0cce5-9b26-41f9-a1b3-66ca72625219';
  
      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId,
       });
  
      const expoPushToken = tokenData.data
  
      await api.post("/users/pushexpotoken", {
        userId,
        expoPushToken : expoPushToken,
      });
  
    } catch (err) {
      console.log('NOTIFICATION ERROR:', err);
    }
  }

export async function sendTestPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: '🔥 Test Notification',
      body: 'It works! Your push setup is live.',
      data: { someData: 'goes here' },
    };
    const res = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      
      const data = await res.json();
      
      console.log('🔥 PUSH RESPONSE:', JSON.stringify(data, null, 2));
  }