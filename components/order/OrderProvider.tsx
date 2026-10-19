import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export type OrderLine = { name: string; price: number; qty: number }

type OrderCtx = {
  lines: OrderLine[]
  add: (name: string, price: number) => void
  remove: (name: string) => void
  clear: () => void
  total: number
  count: number
  open: boolean
  setOpen: (v: boolean) => void
}

const Ctx = createContext<OrderCtx | null>(null)
const KEY = "hills-order"

async function loadLines(): Promise<OrderLine[]> {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    }
    const raw = await AsyncStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

async function saveLines(lines: OrderLine[]) {
  try {
    const raw = JSON.stringify(lines)
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.setItem(KEY, raw)
      return
    }
    await AsyncStorage.setItem(KEY, raw)
  } catch {
    /* ignore */
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<OrderLine[]>([])
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    loadLines().then((l) => {
      setLines(l)
      setReady(true)
    })
  }, [])

  useEffect(() => {
    if (!ready) return
    saveLines(lines)
  }, [lines, ready])

  const add = useCallback((name: string, price: number) => {
    setLines((prev) => {
      const found = prev.find((l) => l.name === name)
      if (found) return prev.map((l) => (l.name === name ? { ...l, qty: l.qty + 1 } : l))
      return [...prev, { name, price, qty: 1 }]
    })
  }, [])

  const remove = useCallback((name: string) => {
    setLines((prev) =>
      prev.flatMap((l) => (l.name === name ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])),
    )
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo(() => {
    const total = lines.reduce((s, l) => s + l.price * l.qty, 0)
    const count = lines.reduce((s, l) => s + l.qty, 0)
    return { lines, add, remove, clear, total, count, open, setOpen }
  }, [lines, add, remove, clear, open])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useOrder() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useOrder must be used inside OrderProvider")
  return ctx
}
