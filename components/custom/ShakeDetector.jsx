
import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

export const useShakeDetection = (onShake) => {
    const [subscription, setSubscription] = useState(null);
    const [accelerometerData, setAccelerometerData] = useState({
      x: 0, y: 0, z: 0,
    });
    const threshold = 1.2; // Adjust for sensitivity

    const _subscribe = () => {
      setSubscription(
        Accelerometer.addListener((data) => {
          setAccelerometerData(data);
        })
      );
    };

    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
    };

    useEffect(() => {
      _subscribe();
      return () => _unsubscribe();
    }, []);

    useEffect(() => {
      const { x, y, z } = accelerometerData;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      if (magnitude > threshold) {
        onShake();
      }
    }, [accelerometerData]);
  };