// notifications/foregroundNotificationStore.js

let currentForegroundNotification = null;

const listeners = new Set();

export const setForegroundNotification =
  (notification) => {
    currentForegroundNotification =
      notification;
    listeners.forEach(
      (listener) => {
        listener(
          currentForegroundNotification
        );
      }
    );
};

export const clearForegroundNotification =
  () => {
    currentForegroundNotification =
      null;
    listeners.forEach(
      (listener) => {
        listener(null);
      }
    );
};

export const subscribeForegroundNotification =
  (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
};