import { notificationHandler } from "./notificationHandler";


export function routeNotification(data) {
  if (!data?.type) return;
  const handler = notificationHandler[data.type];
  if (!handler) {
    console.log("NO HANDLER:", data.type);
    return;
  }
  handler(data);
}