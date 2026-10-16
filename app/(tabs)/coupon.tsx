import { useEffect, useState } from "react"
import { ActivityIndicator, Platform, Pressable, SafeAreaView, StyleSheet, View } from "react-native"
import { WebView } from "react-native-webview"
import { Ionicons } from "@expo/vector-icons"
import { AppText } from "@/components/AppText"
import { COLORS, FONTS } from "@/constants/theme"
import {
  enablePushNotifications,
  getLocalPushToken,
  removeLocalPushRegistration,
} from "@/lib/push-notifications"

export default function CouponScreen() {
  const [registered, setRegistered] = useState(false)
  const [working, setWorking] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    getLocalPushToken().then((token) => setRegistered(token !== null)).catch((error: unknown) => {
      console.error("Unable to read the local push notification registration.", error)
      setMessage("Impossibile verificare la registrazione delle notifiche.")
    })
  }, [])

  const handleEnable = async () => {
    setWorking(true)
    setMessage("")
    try {
      await enablePushNotifications()
      setRegistered(true)
      setMessage("Permesso attivo e token salvato su questo dispositivo. L'invio delle campagne richiede ancora il collegamento con Couponoo.")
    } catch (error) {
      console.error("Unable to enable push notifications.", error)
      setMessage(error instanceof Error ? error.message : "Non è stato possibile attivare le notifiche.")
    } finally {
      setWorking(false)
    }
  }

  const handleRemove = async () => {
    setWorking(true)
    setMessage("")
    try {
      await removeLocalPushRegistration()
      setRegistered(false)
      setMessage("Registrazione locale rimossa. Per revocare il permesso, usa anche le impostazioni del dispositivo.")
    } catch (error) {
      console.error("Unable to remove the local push notification registration.", error)
      setMessage("Non è stato possibile rimuovere la registrazione locale.")
    } finally {
      setWorking(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS !== "web" ? (
        <View style={styles.pushPanel}>
          <View style={styles.pushHeading}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.ink} />
            <AppText style={styles.pushTitle}>Notifiche Hill&apos;s</AppText>
          </View>
          <AppText style={styles.pushDescription}>
            Prepara l&apos;app a ricevere aggiornamenti e promozioni. L&apos;attivazione richiede il tuo consenso.
          </AppText>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: working }}
            disabled={working}
            onPress={registered ? handleRemove : handleEnable}
            style={({ pressed }) => [
              styles.pushButton,
              registered && styles.removeButton,
              pressed && !working && styles.pressedButton,
              working && styles.disabledButton,
            ]}
          >
            {working ? (
              <ActivityIndicator color={registered ? COLORS.ink : COLORS.white} />
            ) : (
              <>
                <Ionicons
                  name={registered ? "notifications-off-outline" : "notifications"}
                  size={18}
                  color={registered ? COLORS.ink : COLORS.white}
                />
                <AppText style={[styles.pushButtonLabel, registered && styles.removeButtonLabel]}>
                  {registered ? "Rimuovi registrazione" : "Attiva notifiche"}
                </AppText>
              </>
            )}
          </Pressable>
          {message ? <AppText accessibilityLiveRegion="polite" style={styles.pushMessage}>{message}</AppText> : null}
          <AppText style={styles.privacyNote}>
            Il token tecnico resta salvato solo su questo dispositivo: non viene ancora inviato a Couponoo né usato per iscrivere a campagne marketing.
          </AppText>
        </View>
      ) : null}
      <WebView
        source={{ uri: "https://app.couponoo.it/hills-burger/promozioni-pubbliche" }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  webview: {
    flex: 1,
  },
  pushPanel: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: COLORS.cream,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(26,20,15,0.12)",
  },
  pushHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pushTitle: {
    fontFamily: FONTS.display,
    fontSize: 19,
    color: COLORS.ink,
  },
  pushDescription: {
    marginTop: 4,
    fontFamily: FONTS.sansMedium,
    fontSize: 12,
    lineHeight: 17,
    color: "rgba(26,20,15,0.72)",
  },
  pushButton: {
    minHeight: 42,
    marginTop: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: COLORS.ink,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  removeButton: {
    backgroundColor: "rgba(26,20,15,0.08)",
    borderWidth: 1,
    borderColor: "rgba(26,20,15,0.16)",
  },
  pushButtonLabel: {
    fontFamily: FONTS.sansBold,
    fontSize: 13,
    color: COLORS.white,
  },
  removeButtonLabel: {
    color: COLORS.ink,
  },
  pressedButton: {
    opacity: 0.82,
  },
  disabledButton: {
    opacity: 0.65,
  },
  pushMessage: {
    marginTop: 8,
    fontFamily: FONTS.sansMedium,
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.ink,
  },
  privacyNote: {
    marginTop: 8,
    fontFamily: FONTS.sansMedium,
    fontSize: 10,
    lineHeight: 14,
    color: "rgba(26,20,15,0.58)",
  },
});
