import { useState } from "react"
import { ScrollView, View, Text, TextInput, Pressable, Linking, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { PopCard } from "@/components/PopCard"
import { PopButton } from "@/components/PopButton"
import { COLORS, softHardShadow } from "@/constants/theme"
import { VENUE } from "@/data/info"

function Field({ label, value, onChangeText, placeholder, keyboardType }: {
  label: string
  value: string
  onChangeText: (t: string) => void
  placeholder?: string
  keyboardType?: "default" | "phone-pad"
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 13, fontWeight: "900", color: COLORS.ink, marginBottom: 6, letterSpacing: 0.3 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(17,17,17,0.35)"
        keyboardType={keyboardType}
        style={{
          backgroundColor: COLORS.white,
          borderWidth: 3,
          borderColor: COLORS.ink,
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 12,
          fontSize: 15,
          fontWeight: "600",
          color: COLORS.ink,
        }}
      />
    </View>
  )
}

const PEOPLE = ["1", "2", "3", "4", "5", "6+"]

export default function Prenota() {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [people, setPeople] = useState("2")
  const [notes, setNotes] = useState("")

  const send = () => {
    const msg = `Ciao Hill's Burger! Vorrei prenotare un tavolo.%0A%0A👤 Nome: ${name || "-"}%0A📞 Telefono: ${phone || "-"}%0A📅 Data: ${date || "-"}%0A🕐 Ora: ${time || "-"}%0A👥 Persone: ${people}%0A📝 Note: ${notes || "-"}`
    Linking.openURL(`${VENUE.whatsapp}?text=${msg}`)
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.yellow }} contentContainerStyle={{ alignItems: "center", paddingBottom: 48 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={{ width: "100%", maxWidth: 900, paddingTop: insets.top + 16, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 34, fontWeight: "900", color: COLORS.ink, letterSpacing: -1 }}>PRENOTA</Text>
        <Text style={{ fontSize: 34, fontWeight: "900", color: COLORS.red, letterSpacing: -1, marginTop: -6, marginBottom: 6 }}>UN TAVOLO</Text>
        <Text style={{ fontSize: 14, fontWeight: "700", color: COLORS.ink, marginBottom: 20, opacity: 0.8 }}>
          Compila e invia la richiesta su WhatsApp. Ti confermiamo in pochi minuti!
        </Text>

        <PopCard bg={COLORS.cream} style={{ padding: 18 }}>
          <Field label="NOME E COGNOME" value={name} onChangeText={setName} placeholder="Homer Simpson" />
          <Field label="TELEFONO" value={phone} onChangeText={setPhone} placeholder="333 000 0000" keyboardType="phone-pad" />
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Field label="DATA" value={date} onChangeText={setDate} placeholder="es. Sab 21" />
            </View>
            <View style={{ flex: 1 }}>
              <Field label="ORA" value={time} onChangeText={setTime} placeholder="20:30" />
            </View>
          </View>

          <Text style={{ fontSize: 13, fontWeight: "900", color: COLORS.ink, marginBottom: 8, letterSpacing: 0.3 }}>PERSONE</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {PEOPLE.map((p) => {
              const on = p === people
              return (
                <Pressable
                  key={p}
                  onPress={() => setPeople(p)}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    borderWidth: 3,
                    borderColor: COLORS.ink,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: on ? COLORS.red : COLORS.white,
                    ...(on ? softHardShadow : { shadowOpacity: 0, elevation: 0 }),
                  }}
                >
                  <Text style={{ fontWeight: "900", fontSize: 15, color: on ? COLORS.white : COLORS.ink }}>{p}</Text>
                </Pressable>
              )
            })}
          </View>

          <Field label="NOTE (opzionale)" value={notes} onChangeText={setNotes} placeholder="Allergie, seggiolone, tavolo esterno..." />

          <View style={{ marginTop: 6 }}>
            <PopButton label="INVIA SU WHATSAPP" icon="logo-whatsapp" bg={COLORS.green} onPress={send} />
          </View>
        </PopCard>

        <Pressable onPress={() => Linking.openURL(VENUE.phoneHref)} style={{ marginTop: 16 }}>
          <PopCard bg={COLORS.white} style={{ padding: 16, flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ backgroundColor: COLORS.sky, borderWidth: 2, borderColor: COLORS.ink, borderRadius: 10, width: 44, height: 44, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="call" size={22} color={COLORS.ink} />
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: "700", color: "rgba(17,17,17,0.6)" }}>Preferisci chiamare?</Text>
              <Text style={{ fontSize: 18, fontWeight: "900", color: COLORS.ink }}>{VENUE.phone}</Text>
            </View>
          </PopCard>
        </Pressable>
      </View>
    </ScrollView>
  )
}
