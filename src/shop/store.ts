import { useCallback, useMemo, useState } from "react"
import { defaultShopDb } from "./defaultData"
import type { CategoryItem, CollectionItem, ProductItem, QuoteRequest, ShopDb } from "./types"
import { slugify } from "./utils"

const SHOP_DB_KEY = "ashok_shop_db_v1"
const ADMIN_SESSION_KEY = "ashok_shop_admin_session"
const ADMIN_PASSWORD_KEY = "ashok_shop_admin_password_hash"
const DEFAULT_ADMIN_USER = "admin"
const DEFAULT_ADMIN_PASSWORD = "admin321"
const REQUESTED_WHATSAPP_NUMBER = "+91 9746755852"

const cloneDefaultDb = (): ShopDb => structuredClone(defaultShopDb)

export const readShopDb = (): ShopDb => {
  if (typeof window === "undefined") {
    return cloneDefaultDb()
  }

  const raw = localStorage.getItem(SHOP_DB_KEY)
  if (!raw) {
    const seeded = cloneDefaultDb()
    localStorage.setItem(SHOP_DB_KEY, JSON.stringify(seeded))
    return seeded
  }

  try {
    const parsed = JSON.parse(raw) as ShopDb
    const nextWhatsapp = REQUESTED_WHATSAPP_NUMBER

    return {
      ...cloneDefaultDb(),
      ...parsed,
      collections: parsed.collections ?? [],
      categories: parsed.categories ?? [],
      products: parsed.products ?? [],
      quoteRequests: parsed.quoteRequests ?? [],
      settings: { ...cloneDefaultDb().settings, ...parsed.settings, whatsappNumber: nextWhatsapp },
    }
  } catch {
    const seeded = cloneDefaultDb()
    localStorage.setItem(SHOP_DB_KEY, JSON.stringify(seeded))
    return seeded
  }
}

export const writeShopDb = (db: ShopDb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(SHOP_DB_KEY, JSON.stringify(db))
  }
}

export const useShopDb = () => {
  const [db, setDb] = useState<ShopDb>(() => readShopDb())

  const setAndPersist = useCallback((updater: (prev: ShopDb) => ShopDb) => {
    setDb((prev) => {
      const next = updater(prev)
      writeShopDb(next)
      return next
    })
  }, [])

  const activeCollections = useMemo(
    () => db.collections.filter((collection) => collection.status === "active").sort((a, b) => a.displayOrder - b.displayOrder),
    [db.collections],
  )

  const activeCategories = useMemo(
    () => db.categories.filter((category) => category.status === "active").sort((a, b) => a.displayOrder - b.displayOrder),
    [db.categories],
  )

  const activeProducts = useMemo(() => db.products.filter((product) => product.status === "active"), [db.products])

  const getCollectionBySlug = useCallback(
    (slug: string) => db.collections.find((collection) => collection.slug === slug),
    [db.collections],
  )

  const getCategoryBySlug = useCallback(
    (slug: string) => db.categories.find((category) => category.slug === slug),
    [db.categories],
  )

  const getProductBySlug = useCallback(
    (slug: string) => db.products.find((product) => product.slug === slug),
    [db.products],
  )

  const upsertCollection = useCallback(
    (collection: CollectionItem) => {
      setAndPersist((prev) => {
        const found = prev.collections.some((item) => item.id === collection.id)
        const nextCollection = { ...collection, slug: slugify(collection.name) }
        return {
          ...prev,
          collections: found
            ? prev.collections.map((item) => (item.id === collection.id ? nextCollection : item))
            : [...prev.collections, nextCollection],
        }
      })
    },
    [setAndPersist],
  )

  const deleteCollection = useCallback(
    (collectionId: string) => {
      setAndPersist((prev) => ({
        ...prev,
        collections: prev.collections.filter((collection) => collection.id !== collectionId),
        categories: prev.categories.filter((category) => category.collectionId !== collectionId),
        products: prev.products.filter((product) => product.collectionId !== collectionId),
      }))
    },
    [setAndPersist],
  )

  const upsertCategory = useCallback(
    (category: CategoryItem) => {
      setAndPersist((prev) => {
        const found = prev.categories.some((item) => item.id === category.id)
        const nextCategory = { ...category, slug: slugify(category.name) }
        return {
          ...prev,
          categories: found
            ? prev.categories.map((item) => (item.id === category.id ? nextCategory : item))
            : [...prev.categories, nextCategory],
        }
      })
    },
    [setAndPersist],
  )

  const deleteCategory = useCallback(
    (categoryId: string) => {
      setAndPersist((prev) => ({
        ...prev,
        categories: prev.categories.filter((category) => category.id !== categoryId),
        products: prev.products.filter((product) => product.categoryId !== categoryId),
      }))
    },
    [setAndPersist],
  )

  const upsertProduct = useCallback(
    (product: ProductItem) => {
      setAndPersist((prev) => {
        const found = prev.products.some((item) => item.id === product.id)
        const nextProduct = {
          ...product,
          slug: slugify(`${product.name}-${product.productCode}`),
        }

        return {
          ...prev,
          products: found ? prev.products.map((item) => (item.id === product.id ? nextProduct : item)) : [...prev.products, nextProduct],
        }
      })
    },
    [setAndPersist],
  )

  const deleteProduct = useCallback(
    (productId: string) => {
      setAndPersist((prev) => ({
        ...prev,
        products: prev.products.filter((product) => product.id !== productId),
      }))
    },
    [setAndPersist],
  )

  const addQuoteRequest = useCallback(
    (quote: QuoteRequest) => {
      setAndPersist((prev) => ({
        ...prev,
        quoteRequests: [quote, ...prev.quoteRequests],
      }))
    },
    [setAndPersist],
  )

  const updateQuoteStatus = useCallback(
    (quoteId: string, status: QuoteRequest["status"]) => {
      setAndPersist((prev) => ({
        ...prev,
        quoteRequests: prev.quoteRequests.map((quote) => (quote.id === quoteId ? { ...quote, status } : quote)),
      }))
    },
    [setAndPersist],
  )

  const updateSettings = useCallback(
    (settings: ShopDb["settings"]) => {
      setAndPersist((prev) => ({ ...prev, settings }))
    },
    [setAndPersist],
  )

  return {
    db,
    activeCollections,
    activeCategories,
    activeProducts,
    getCollectionBySlug,
    getCategoryBySlug,
    getProductBySlug,
    upsertCollection,
    deleteCollection,
    upsertCategory,
    deleteCategory,
    upsertProduct,
    deleteProduct,
    addQuoteRequest,
    updateQuoteStatus,
    updateSettings,
  }
}

const encoder = new TextEncoder()

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value))
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

export const ensureAdminPasswordHash = async () => {
  if (typeof window === "undefined") {
    return
  }
  if (!localStorage.getItem(ADMIN_PASSWORD_KEY)) {
    const hashed = await sha256(DEFAULT_ADMIN_PASSWORD)
    localStorage.setItem(ADMIN_PASSWORD_KEY, hashed)
  }
}

export const loginAdmin = async (username: string, password: string) => {
  await ensureAdminPasswordHash()
  const targetHash = localStorage.getItem(ADMIN_PASSWORD_KEY)
  const passwordHash = await sha256(password)
  if (username !== DEFAULT_ADMIN_USER || passwordHash !== targetHash) {
    return false
  }

  const expiresAt = Date.now() + 1000 * 60 * 60 * 8
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ username, expiresAt }))
  return true
}

export const isAdminLoggedIn = () => {
  if (typeof window === "undefined") {
    return false
  }
  const raw = localStorage.getItem(ADMIN_SESSION_KEY)
  if (!raw) {
    return false
  }
  try {
    const session = JSON.parse(raw) as { username: string; expiresAt: number }
    if (session.username !== DEFAULT_ADMIN_USER || session.expiresAt < Date.now()) {
      localStorage.removeItem(ADMIN_SESSION_KEY)
      return false
    }
    return true
  } catch {
    localStorage.removeItem(ADMIN_SESSION_KEY)
    return false
  }
}

export const logoutAdmin = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_SESSION_KEY)
  }
}

export const changeAdminPassword = async (currentPassword: string, nextPassword: string) => {
  await ensureAdminPasswordHash()
  const currentHash = await sha256(currentPassword)
  const storedHash = localStorage.getItem(ADMIN_PASSWORD_KEY)
  if (currentHash !== storedHash) {
    return false
  }
  const nextHash = await sha256(nextPassword)
  localStorage.setItem(ADMIN_PASSWORD_KEY, nextHash)
  return true
}
