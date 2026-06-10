import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

const CART_KEY = "ashok_shop_cart_v1"

interface CartContextValue {
  productIds: string[]
  count: number
  add: (productId: string) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const readCart = () => {
  if (typeof window === "undefined") {
    return [] as string[]
  }
  const raw = localStorage.getItem(CART_KEY)
  if (!raw) {
    return []
  }
  try {
    return JSON.parse(raw) as string[]
  } catch {
    return []
  }
}

const writeCart = (productIds: string[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(productIds))
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [productIds, setProductIds] = useState<string[]>(() => readCart())

  const add = useCallback((productId: string) => {
    setProductIds((prev) => {
      if (prev.includes(productId)) {
        return prev
      }
      const next = [...prev, productId]
      writeCart(next)
      return next
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setProductIds((prev) => {
      const next = prev.filter((id) => id !== productId)
      writeCart(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setProductIds([])
    writeCart([])
  }, [])

  const value = useMemo(
    () => ({ productIds, count: productIds.length, add, remove, clear }),
    [productIds, add, remove, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }
  return context
}
