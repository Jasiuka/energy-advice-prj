import { atom, createStore } from "jotai";
// SIMPLE JOTAI STORE
let timer = null;
export const jotaiStore = createStore();
export const parametersAtom = atom([
  {
    show: true,
    label: "Temperatūra",
    name: "temperature",
    api_name: ["temperature_2m"],
    id: 1,
  },
  {
    show: true,
    label: "Dregmė",
    name: "humidity",
    api_name: ["relative_humidity_2m"],
    id: 2,
  },
  {
    show: true,
    label: "Debesuotumas",
    name: "cloud_cover",
    api_name: ["cloud_cover"],
    id: 3,
  },
  {
    show: true,
    label: "Matomumas",
    name: "visibility",
    api_name: ["visibility"],
    id: 4,
  },
  {
    show: true,
    label: "Vėjo greitis",
    name: "wind",
    api_name: ["wind_speed_10m"],
    id: 5,
  },
]);
export const markersAtom = atom([]);
export const datesAtom = atom([]);
export const notificationsAtom = atom([]);
export const authAtom = atom(null);

export const createNotification = (notification) => {
  notification.id = Date.now() + Math.random();

  jotaiStore.set(notificationsAtom, [
    ...jotaiStore.get(notificationsAtom),
    notification,
  ]);

  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  if (!timer) {
    timer = setInterval(() => {
      removeFirstNotification();
    }, 2000);
  }
};

export const removeFirstNotification = () => {
  const newNotifications = jotaiStore.get(notificationsAtom).slice(1);
  jotaiStore.set(notificationsAtom, newNotifications);
  const notifications = jotaiStore.get(notificationsAtom);
  if (notifications.length === 0) {
    clearInterval(timer);
    timer = null;
  }
};

export const removeNotificationWithClick = (notificationId) => {
  const notifications = jotaiStore.get(notificationsAtom);
  const newNotifications = notifications.filter(
    (notification) => notification.id !== notificationId
  );
  jotaiStore.set(notificationsAtom, newNotifications);
};
