import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

const DEVICE_TOKEN_KEY = "hills-push-device-token"
const PUSH_OPT_IN_KEY = "hills-push-opt-in"
const ANDROID_CHANNEL_ID = "promozioni"

export type NativePushToken = Awaited<ReturnType<typeof Notifications.getDevicePushTokenAsync>>

function isNativePushToken(value: unknown): value is NativePushToken {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    (value.type === "ios" || value.type === "android") &&
    "data" in value &&
    typeof value.data === "string"
  )
}

async function saveLocalPushToken(token: NativePushToken) {
  await AsyncStorage.setItem(DEVICE_TOKEN_KEY, JSON.stringify(token))
}

export async function enablePushNotifications() {
  if (Platform.OS === "web") {
    throw new Error("Le notifiche push sono disponibili solo nell'app Android o iOS.")
  }
  if (!Device.isDevice) {
    throw new Error("Per attivare le notifiche serve un dispositivo fisico.")
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
      name: "Promozioni",
      importance: Notifications.AndroidImportance.DEFAULT,
    })
  }

  let permission = await Notifications.getPermissionsAsync()
  if (!permission.granted) {
    permission = await Notifications.requestPermissionsAsync()
  }
  if (!permission.granted) {
    throw new Error("Permesso notifiche non concesso. Puoi abilitarlo dalle impostazioni del dispositivo.")
  }

  const token = await Notifications.getDevicePushTokenAsync()
  await saveLocalPushToken(token)
  await AsyncStorage.setItem(PUSH_OPT_IN_KEY, "true")
  return token
}

export async function getLocalPushToken() {
  if ((await AsyncStorage.getItem(PUSH_OPT_IN_KEY)) !== "true") return null

  const storedToken = await AsyncStorage.getItem(DEVICE_TOKEN_KEY)
  if (storedToken === null) return null

  const token: unknown = JSON.parse(storedToken)
  if (!isNativePushToken(token)) {
    throw new Error("Il token push salvato localmente non è valido.")
  }
  return token
}

export async function updateLocalPushToken(token: NativePushToken) {
  if ((await AsyncStorage.getItem(PUSH_OPT_IN_KEY)) === "true") {
    await saveLocalPushToken(token)
  }
}

export async function removeLocalPushRegistration() {
  await AsyncStorage.multiRemove([DEVICE_TOKEN_KEY, PUSH_OPT_IN_KEY])
}
