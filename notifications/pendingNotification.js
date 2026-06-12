

let pendingNotification = null;
export const setPendingNotification =
  (data) => {
    pendingNotification = data;
};

export const getPendingNotification =
  () => pendingNotification;

export const clearPendingNotification =
  () => {
    pendingNotification = null;
};