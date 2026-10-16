import "../global.css"
import { Stack, type ErrorBoundaryProps, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useFonts } from "expo-font"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useEffect } from "react"
import { Pressable, View } from "react-native"
import * as Notifications from "expo-notifications"
import { AppText as Text } from "@/components/AppText"
import { COLORS, FONTS } from "@/constants/theme"
import { updateLocalPushToken } from "@/lib/push-notifications"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function RootLayout() {
  const router = useRouter()
  const lastNotificationResponse = Notifications.useLastNotificationResponse()
  const [, fontError] = useFonts({
    Baloo2_700Bold: require("@expo-google-fonts/baloo-2/700Bold/Baloo2_700Bold.ttf"),
    Baloo2_800ExtraBold: require("@expo-google-fonts/baloo-2/800ExtraBold/Baloo2_800ExtraBold.ttf"),
    Poppins_500Medium: require("@expo-google-fonts/poppins/500Medium/Poppins_500Medium.ttf"),
    Poppins_600SemiBold: require("@expo-google-fonts/poppins/600SemiBold/Poppins_600SemiBold.ttf"),
    Poppins_700Bold: require("@expo-google-fonts/poppins/700Bold/Poppins_700Bold.ttf"),
  })

  useEffect(() => {
    if (fontError) console.error("Unable to load custom fonts; using system fonts.", fontError)
  }, [fontError])

  useEffect(() => {
    const subscription = Notifications.addPushTokenListener((token) => {
      updateLocalPushToken(token).catch((error: unknown) => {
        console.error("Unable to update the local push token.", error)
      })
    })
    return () => subscription.remove()
  }, [])

  useEffect(() => {
    if (!lastNotificationResponse) return

    if (
      lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER &&
      lastNotificationResponse.notification.request.content.data?.route === "coupon"
    ) {
      router.navigate("/coupon")
    }

    Notifications.clearLastNotificationResponseAsync().catch((error: unknown) => {
      console.error("Unable to clear the handled notification response.", error)
    })
  }, [lastNotificationResponse, router])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 28, backgroundColor: COLORS.sun }}>
      <Text style={{ fontFamily: FONTS.display, fontSize: 26, color: COLORS.ink, textAlign: "center" }}>
        Ops! Qualcosa non ha funzionato.
      </Text>
      <Text selectable style={{ fontFamily: FONTS.sansMedium, fontSize: 12, lineHeight: 18, color: COLORS.ink, textAlign: "center", marginTop: 10 }}>
        {error.message}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={retry}
        style={{ backgroundColor: COLORS.ink, borderRadius: 999, paddingHorizontal: 22, paddingVertical: 12, marginTop: 20 }}
      >
        <Text style={{ fontFamily: FONTS.display, fontSize: 14, color: COLORS.sun }}>
          RICARICA L&apos;APP
        </Text>
      </Pressable>
    </View>
  )
}
