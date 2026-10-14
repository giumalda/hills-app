import { useState } from "react"
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Linking,
  Modal,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useOrder } from "./OrderProvider"
import { COLORS, FONTS } from "@/constants/theme"
import { LiquidGlass } from "@/components/LiquidGlass"

export function OrderPad() {
  const { lines, add, remove, clear, total, count, open, setOpen } = useOrder()
  const insets = useSafeAreaInsets()
  const [orderType, setOrderType] = useState<"ritiro" | "locale">("ritiro")
  const [guests, setGuests] = useState(1)
  const [pickupTime, setPickupTime] = useState("20:30")

  const isTimeValid = (time: string) => {
    if (!time || !/^\d{2}:\d{2}$/.test(time)) return true
    const [h, m] = time.split(":").map(Number)
    const totalMinutes = h * 60 + m
    const startMin = 18 * 60
    const endMin = 30
    return (totalMinutes >= startMin && totalMinutes <= 24 * 60) || (totalMinutes >= 0 && totalMinutes <= endMin)
  }

  const timeError = !isTimeValid(pickupTime)
  const copertoCosto = orderType === "locale" ? guests * 2.0 : 0
  const finalTotal = total + copertoCosto

  const handleWhatsAppOrder = () => {
    const itemsText =
      lines.length > 0
        ? lines.map((l) => `${l.qty}x ${l.name} — € ${(l.price * l.qty).toFixed(2)}`).join("\n")
        : "Nessun piatto"
    const message =
      `Orario di ritiro: ${pickupTime}\n\n` + `Piatti:\n${itemsText}\n\n` + `Totale: € ${finalTotal.toFixed(2)}`
    Linking.openURL(`https://wa.me/393332968401?text=${encodeURIComponent(message)}`)
  }

  return (
    <>
      {!open ? (
        <LiquidGlass
          intensity={76}
          tintColor="rgba(255,255,255,0.5)"
          style={{
            position: "absolute",
            left: 16,
            bottom: Platform.OS === "web" ? 92 : insets.bottom + 88,
            zIndex: 90,
            borderRadius: 999,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Apri carrello, ${count} articoli, totale ${total.toFixed(2)} euro`}
            onPress={() => setOpen(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              borderRadius: 999,
              paddingHorizontal: 14,
              paddingVertical: 10,
            }}
          >
            <Ionicons name="bag-handle-outline" size={18} color={COLORS.ink} />
            <Text style={{ fontFamily: FONTS.display, fontSize: 14, color: COLORS.ink, textTransform: "uppercase" }}>
              Carrello
            </Text>
            <Text style={{ fontFamily: FONTS.sansBold, color: COLORS.ink, fontSize: 12 }}>
              € {total.toFixed(2).replace(".", ",")}
            </Text>
            <View style={{ backgroundColor: COLORS.primary, borderRadius: 999, minWidth: 22, alignItems: "center", paddingHorizontal: 6, paddingVertical: 2 }}>
              <Text style={{ fontFamily: FONTS.display, color: COLORS.white, fontSize: 12 }}>{count}</Text>
            </View>
          </Pressable>
        </LiquidGlass>
      ) : null}

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(26,20,15,0.2)" }}
          onPress={() => setOpen(false)}
        />
        <View
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: Math.max(insets.bottom, 12),
            maxHeight: "88%",
            backgroundColor: "#fef39e",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#e6dc85",
            padding: 18,
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 10 },
            elevation: 12,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 2, borderStyle: "dashed", borderColor: "rgba(26,20,15,0.2)", paddingBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.ink, textTransform: "uppercase" }}>
                Il mio ordine
              </Text>
              <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 12, color: "rgba(26,20,15,0.6)", marginTop: 2 }}>
                {count === 0 ? "Blocchetto vuoto" : `${count} pezzi segnati`}
              </Text>
              <Text style={{ fontFamily: FONTS.sansBold, fontSize: 10, color: COLORS.primary, marginTop: 4, textTransform: "uppercase" }}>
                * Le bibite si calcolano a parte
              </Text>
            </View>
            <Pressable onPress={() => setOpen(false)} hitSlop={10}>
              <Ionicons name="close" size={22} color={COLORS.ink} />
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", gap: 6, marginVertical: 12, backgroundColor: "rgba(26,20,15,0.1)", borderRadius: 12, padding: 4 }}>
            {(["ritiro", "locale"] as const).map((t) => (
              <Pressable
                key={t}
                onPress={() => setOrderType(t)}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor: orderType === t ? COLORS.ink : "transparent",
                }}
              >
                <Ionicons name={t === "ritiro" ? "storefront" : "restaurant"} size={14} color={orderType === t ? COLORS.sun : COLORS.ink} />
                <Text style={{ fontFamily: FONTS.display, fontSize: 12, color: orderType === t ? COLORS.sun : COLORS.ink, textTransform: "uppercase" }}>
                  {t === "ritiro" ? "Ritiro" : "In locale"}
                </Text>
              </Pressable>
            ))}
          </View>

          <ScrollView style={{ maxHeight: 220 }} showsVerticalScrollIndicator={false}>
            {lines.length === 0 ? (
              <Text style={{ textAlign: "center", paddingVertical: 28, fontFamily: FONTS.sansMedium, fontSize: 13, color: "rgba(26,20,15,0.6)" }}>
                Premi Aggiungi su un panino e finirà qui.
              </Text>
            ) : (
              lines.map((l) => (
                <View key={l.name} style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 8, borderBottomWidth: 1, borderColor: "rgba(26,20,15,0.06)" }}>
                  <Text style={{ flex: 1, fontFamily: FONTS.sans, fontSize: 12, color: COLORS.ink }} numberOfLines={1}>
                    {l.name}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.65)", borderRadius: 999, paddingHorizontal: 6, paddingVertical: 3 }}>
                    <Pressable onPress={() => remove(l.name)}>
                      <Ionicons name="remove" size={14} color={COLORS.ink} />
                    </Pressable>
                    <Text style={{ fontFamily: FONTS.display, width: 16, textAlign: "center", fontSize: 12 }}>{l.qty}</Text>
                    <Pressable onPress={() => add(l.name, l.price)}>
                      <Ionicons name="add" size={14} color={COLORS.ink} />
                    </Pressable>
                  </View>
                  <Text style={{ width: 58, textAlign: "right", fontFamily: FONTS.sansBold, fontSize: 12 }}>
                    € {(l.price * l.qty).toFixed(2)}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>

          <View style={{ borderTopWidth: 2, borderStyle: "dashed", borderColor: "rgba(26,20,15,0.2)", paddingTop: 12, marginTop: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(26,20,15,0.05)", borderRadius: 12, padding: 10, marginBottom: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Ionicons name="time" size={14} color={COLORS.primary} />
                <Text style={{ fontFamily: FONTS.display, fontSize: 12, textTransform: "uppercase" }}>Orario ritiro</Text>
              </View>
              <TextInput
                value={pickupTime}
                onChangeText={setPickupTime}
                placeholder="20:30"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  borderWidth: 1,
                  borderColor: timeError ? "#dc2626" : "rgba(26,20,15,0.15)",
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  fontFamily: FONTS.display,
                  fontSize: 12,
                  minWidth: 72,
                  textAlign: "center",
                }}
              />
            </View>
            {timeError ? (
              <Text style={{ color: "#dc2626", fontSize: 10, fontFamily: FONTS.sans, marginBottom: 8 }}>
                Orario consentito 18:00 – 00:30
              </Text>
            ) : null}

            {orderType === "locale" ? (
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(26,20,15,0.05)", borderRadius: 12, padding: 10, marginBottom: 8 }}>
                <View>
                  <Text style={{ fontFamily: FONTS.display, fontSize: 12, textTransform: "uppercase" }}>Persone al tavolo</Text>
                  <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 10, color: "rgba(26,20,15,0.6)" }}>Coperto € 2,00 / p.</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Pressable onPress={() => setGuests(Math.max(1, guests - 1))}>
                    <Ionicons name="remove-circle-outline" size={22} color={COLORS.ink} />
                  </Pressable>
                  <Text style={{ fontFamily: FONTS.display, fontSize: 14 }}>{guests}</Text>
                  <Pressable onPress={() => setGuests(guests + 1)}>
                    <Ionicons name="add-circle-outline" size={22} color={COLORS.ink} />
                  </Pressable>
                </View>
              </View>
            ) : null}

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <Text style={{ fontFamily: FONTS.display, fontSize: 20, textTransform: "uppercase" }}>Totale</Text>
              <Text style={{ fontFamily: FONTS.display, fontSize: 20, color: COLORS.primary }}>€ {finalTotal.toFixed(2)}</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 8 }}>
              {orderType === "ritiro" ? (
                <Pressable
                  onPress={handleWhatsAppOrder}
                  disabled={lines.length === 0 || timeError}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    backgroundColor: COLORS.green,
                    borderRadius: 999,
                    paddingVertical: 12,
                    opacity: lines.length === 0 || timeError ? 0.5 : 1,
                  }}
                >
                  <Ionicons name="logo-whatsapp" size={16} color="#fff" />
                  <Text style={{ fontFamily: FONTS.display, fontSize: 12, color: "#fff", textTransform: "uppercase" }}>
                    Invia su WhatsApp
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => Linking.openURL("tel:+393332968401")}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    backgroundColor: COLORS.ink,
                    borderRadius: 999,
                    paddingVertical: 12,
                  }}
                >
                  <Ionicons name="call" size={16} color={COLORS.sun} />
                  <Text style={{ fontFamily: FONTS.display, fontSize: 12, color: COLORS.sun, textTransform: "uppercase" }}>
                    Chiama per il tavolo
                  </Text>
                </Pressable>
              )}
              <Pressable
                onPress={() => {
                  clear()
                  setGuests(1)
                }}
                style={{ borderWidth: 2, borderColor: "rgba(26,20,15,0.2)", borderRadius: 999, padding: 10 }}
              >
                <Ionicons name="trash-outline" size={16} color="rgba(26,20,15,0.55)" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
