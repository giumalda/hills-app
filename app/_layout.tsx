import "../global.css"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useFonts } from "expo-font"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Baloo2_700Bold: require("@expo-google-fonts/baloo-2/700Bold/Baloo2_700Bold.ttf"),
    Baloo2_800ExtraBold: require("@expo-google-fonts/baloo-2/800ExtraBold/Baloo2_800ExtraBold.ttf"),
    Poppins_500Medium: require("@expo-google-fonts/poppins/500Medium/Poppins_500Medium.ttf"),
    Poppins_600SemiBold: require("@expo-google-fonts/poppins/600SemiBold/Poppins_600SemiBold.ttf"),
    Poppins_700Bold: require("@expo-google-fonts/poppins/700Bold/Poppins_700Bold.ttf"),
  })

  if (!fontsLoaded) return null

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
