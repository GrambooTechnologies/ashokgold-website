export type ProductStatus = "active" | "inactive"

export interface CollectionItem {
  id: string
  name: string
  slug: string
  image: string
  displayOrder: number
  status: ProductStatus
}

export interface CategoryItem {
  id: string
  collectionId: string
  name: string
  slug: string
  image: string
  displayOrder: number
  status: ProductStatus
}

export interface ProductItem {
  id: string
  productCode: string
  name: string
  slug: string
  collectionId: string
  categoryId: string
  images: string[]
  featuredImageIndex: number
  grossWeight: number
  netWeight: number
  stoneWeight: number
  diamondWeight: number
  stoneAmount: number
  vaPercent: number
  vaam: number
  purity: string
  description: string
  stockQuantity: number
  estimatedPrice: number
  status: ProductStatus
  featured: boolean
}

export interface QuoteRequest {
  id: string
  date: string
  customerWhatsapp: string
  productIds: string[]
  status: "new" | "contacted" | "converted" | "closed"
}

export interface ShopSettings {
  whatsappNumber: string
  shopBanner: string
  seoTitle: string
  seoDescription: string
}

export interface ShopDb {
  collections: CollectionItem[]
  categories: CategoryItem[]
  products: ProductItem[]
  quoteRequests: QuoteRequest[]
  settings: ShopSettings
}
