import { useEffect, useMemo, useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import {
  changeAdminPassword,
  isAdminLoggedIn,
  logoutAdmin,
  useShopDb,
} from "@/shop/store"
import type { CategoryItem, CollectionItem, ProductItem, QuoteRequest } from "@/shop/types"
import { randomId, slugify } from "@/shop/utils"

export const Route = createFileRoute("/admin")({
  component: AdminDashboardPage,
})

type AdminTab = "overview" | "collections" | "categories" | "products" | "quotes" | "settings"

const imageToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error("Failed to read image"))
    reader.readAsDataURL(file)
  })

function AdminDashboardPage() {
  const navigate = useNavigate()
  const {
    db,
    upsertCollection,
    deleteCollection,
    upsertCategory,
    deleteCategory,
    upsertProduct,
    deleteProduct,
    updateQuoteStatus,
    updateSettings,
  } = useShopDb()

  const [activeTab, setActiveTab] = useState<AdminTab>("overview")

  const [collectionForm, setCollectionForm] = useState<CollectionItem>({
    id: "",
    name: "",
    slug: "",
    image: "",
    displayOrder: 1,
    status: "active",
  })

  const [categoryForm, setCategoryForm] = useState<CategoryItem>({
    id: "",
    collectionId: "",
    name: "",
    slug: "",
    image: "",
    displayOrder: 1,
    status: "active",
  })

  const [productForm, setProductForm] = useState<ProductItem>({
    id: "",
    productCode: "",
    name: "",
    slug: "",
    collectionId: "",
    categoryId: "",
    images: [],
    featuredImageIndex: 0,
    grossWeight: 0,
    netWeight: 0,
    stoneWeight: 0,
    diamondWeight: 0,
    stoneAmount: 0,
    vaPercent: 0,
    vaam: 0,
    purity: "",
    description: "",
    stockQuantity: 0,
    estimatedPrice: 0,
    status: "active",
    featured: false,
  })

  const [currentPassword, setCurrentPassword] = useState("")
  const [nextPassword, setNextPassword] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate({ to: "/admin-login" })
    }
  }, [navigate])

  const dashboardStats = useMemo(
    () => ({
      totalCollections: db.collections.length,
      totalCategories: db.categories.length,
      totalProducts: db.products.length,
      activeProducts: db.products.filter((item) => item.status === "active").length,
      inactiveProducts: db.products.filter((item) => item.status === "inactive").length,
      featuredProducts: db.products.filter((item) => item.featured).length,
      quoteRequests: db.quoteRequests.length,
    }),
    [db],
  )

  const onSaveCollection = () => {
    if (!collectionForm.name || !collectionForm.image) {
      return
    }
    const next: CollectionItem = {
      ...collectionForm,
      id: collectionForm.id || randomId("col"),
      slug: slugify(collectionForm.name),
    }
    upsertCollection(next)
    setCollectionForm({ id: "", name: "", slug: "", image: "", displayOrder: 1, status: "active" })
  }

  const onSaveCategory = () => {
    if (!categoryForm.name || !categoryForm.collectionId || !categoryForm.image) {
      return
    }
    const next: CategoryItem = {
      ...categoryForm,
      id: categoryForm.id || randomId("cat"),
      slug: slugify(categoryForm.name),
    }
    upsertCategory(next)
    setCategoryForm({ id: "", collectionId: "", name: "", slug: "", image: "", displayOrder: 1, status: "active" })
  }

  const onSaveProduct = () => {
    if (!productForm.name || !productForm.productCode || !productForm.collectionId || !productForm.categoryId || productForm.images.length === 0) {
      return
    }
    const next: ProductItem = {
      ...productForm,
      id: productForm.id || randomId("prd"),
      slug: slugify(`${productForm.name}-${productForm.productCode}`),
    }
    upsertProduct(next)
    setProductForm({
      id: "",
      productCode: "",
      name: "",
      slug: "",
      collectionId: "",
      categoryId: "",
      images: [],
      featuredImageIndex: 0,
      grossWeight: 0,
      netWeight: 0,
      stoneWeight: 0,
      diamondWeight: 0,
      stoneAmount: 0,
      vaPercent: 0,
      vaam: 0,
      purity: "",
      description: "",
      stockQuantity: 0,
      estimatedPrice: 0,
      status: "active",
      featured: false,
    })
  }

  const onUploadImages = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      return
    }

    const files = Array.from(fileList).filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    )

    const dataUrls = await Promise.all(files.map((file) => imageToDataUrl(file)))
    setProductForm((prev) => ({ ...prev, images: [...prev.images, ...dataUrls] }))
  }

  const moveImage = (index: number, direction: -1 | 1) => {
    setProductForm((prev) => {
      const nextIndex = index + direction
      if (nextIndex < 0 || nextIndex >= prev.images.length) {
        return prev
      }
      const images = [...prev.images]
      const current = images[index]
      images[index] = images[nextIndex]
      images[nextIndex] = current
      return {
        ...prev,
        images,
        featuredImageIndex:
          prev.featuredImageIndex === index
            ? nextIndex
            : prev.featuredImageIndex === nextIndex
              ? index
              : prev.featuredImageIndex,
      }
    })
  }

  const removeImage = (index: number) => {
    setProductForm((prev) => {
      const images = prev.images.filter((_, idx) => idx !== index)
      return {
        ...prev,
        images,
        featuredImageIndex: Math.max(0, Math.min(prev.featuredImageIndex, images.length - 1)),
      }
    })
  }

  const onChangePassword = async () => {
    setPasswordMessage("")
    if (!currentPassword || !nextPassword) {
      return
    }
    const success = await changeAdminPassword(currentPassword, nextPassword)
    setPasswordMessage(success ? "Password updated" : "Current password is incorrect")
    if (success) {
      setCurrentPassword("")
      setNextPassword("")
    }
  }

  return (
    <main className="min-h-screen bg-[#F4EDD6] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#AA6200]">Admin Dashboard</p>
            <h1 className="text-4xl">Jewellery E-Commerce Management</h1>
          </div>
          <button
            onClick={() => {
              logoutAdmin()
              navigate({ to: "/admin-login" })
            }}
            className="rounded-full border border-[#AA6200] px-4 py-2 text-sm text-[#AA6200]"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {(["overview", "collections", "categories", "products", "quotes", "settings"] as AdminTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-1.5 text-sm capitalize ${
                activeTab === tab ? "bg-[#AA6200] text-[#F4EDD6]" : "border border-[#AA6200] text-[#AA6200]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total Collections" value={dashboardStats.totalCollections} />
            <StatCard label="Total Categories" value={dashboardStats.totalCategories} />
            <StatCard label="Total Products" value={dashboardStats.totalProducts} />
            <StatCard label="Active Products" value={dashboardStats.activeProducts} />
            <StatCard label="Inactive Products" value={dashboardStats.inactiveProducts} />
            <StatCard label="Featured Products" value={dashboardStats.featuredProducts} />
            <StatCard label="Quote Requests" value={dashboardStats.quoteRequests} />
          </div>
        )}

        {activeTab === "collections" && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4">
              <h2 className="text-2xl">Collection Management</h2>
              <div className="mt-3 grid gap-3">
                <input placeholder="Collection name" value={collectionForm.name} onChange={(event) => setCollectionForm((prev) => ({ ...prev, name: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <input placeholder="Collection image URL" value={collectionForm.image} onChange={(event) => setCollectionForm((prev) => ({ ...prev, image: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <input type="number" placeholder="Display order" value={collectionForm.displayOrder} onChange={(event) => setCollectionForm((prev) => ({ ...prev, displayOrder: Number(event.target.value) }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <select value={collectionForm.status} onChange={(event) => setCollectionForm((prev) => ({ ...prev, status: event.target.value as CollectionItem["status"] }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button onClick={onSaveCollection} className="rounded-full bg-[#AA6200] px-4 py-2 text-sm text-[#F4EDD6]">Save Collection</button>
              </div>
            </div>
            <div className="rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4">
              <h2 className="text-2xl">Collections</h2>
              <div className="mt-3 space-y-2">
                {db.collections.map((collection) => (
                  <article key={collection.id} className="flex items-center justify-between rounded-xl border border-[#C8AD7B] bg-white px-3 py-2">
                    <div>
                      <p className="font-medium">{collection.name}</p>
                      <p className="text-xs text-[#5A4420]">Order: {collection.displayOrder} / {collection.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setCollectionForm(collection)} className="rounded-full border border-[#AA6200] px-3 py-1 text-xs text-[#AA6200]">Edit</button>
                      <button onClick={() => deleteCollection(collection.id)} className="rounded-full border border-red-700 px-3 py-1 text-xs text-red-700">Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "categories" && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4">
              <h2 className="text-2xl">Category Management</h2>
              <div className="mt-3 grid gap-3">
                <input placeholder="Category name" value={categoryForm.name} onChange={(event) => setCategoryForm((prev) => ({ ...prev, name: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <select value={categoryForm.collectionId} onChange={(event) => setCategoryForm((prev) => ({ ...prev, collectionId: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm">
                  <option value="">Select collection</option>
                  {db.collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>{collection.name}</option>
                  ))}
                </select>
                <input placeholder="Category image URL" value={categoryForm.image} onChange={(event) => setCategoryForm((prev) => ({ ...prev, image: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <input type="number" placeholder="Display order" value={categoryForm.displayOrder} onChange={(event) => setCategoryForm((prev) => ({ ...prev, displayOrder: Number(event.target.value) }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <select value={categoryForm.status} onChange={(event) => setCategoryForm((prev) => ({ ...prev, status: event.target.value as CategoryItem["status"] }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button onClick={onSaveCategory} className="rounded-full bg-[#AA6200] px-4 py-2 text-sm text-[#F4EDD6]">Save Category</button>
              </div>
            </div>
            <div className="rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4">
              <h2 className="text-2xl">Categories</h2>
              <div className="mt-3 space-y-2">
                {db.categories.map((category) => {
                  const collection = db.collections.find((item) => item.id === category.collectionId)
                  return (
                    <article key={category.id} className="flex items-center justify-between rounded-xl border border-[#C8AD7B] bg-white px-3 py-2">
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-xs text-[#5A4420]">{collection?.name ?? "Unknown"} / Order: {category.displayOrder}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setCategoryForm(category)} className="rounded-full border border-[#AA6200] px-3 py-1 text-xs text-[#AA6200]">Edit</button>
                        <button onClick={() => deleteCategory(category.id)} className="rounded-full border border-red-700 px-3 py-1 text-xs text-red-700">Delete</button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {activeTab === "products" && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4">
              <h2 className="text-2xl">Product Management</h2>
              <div className="mt-3 grid gap-3">
                <input placeholder="Product name" value={productForm.name} onChange={(event) => setProductForm((prev) => ({ ...prev, name: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <input placeholder="Product code" value={productForm.productCode} onChange={(event) => setProductForm((prev) => ({ ...prev, productCode: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <select value={productForm.collectionId} onChange={(event) => setProductForm((prev) => ({ ...prev, collectionId: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm">
                  <option value="">Select collection</option>
                  {db.collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>{collection.name}</option>
                  ))}
                </select>
                <select value={productForm.categoryId} onChange={(event) => setProductForm((prev) => ({ ...prev, categoryId: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm">
                  <option value="">Select category</option>
                  {db.categories.filter((item) => !productForm.collectionId || item.collectionId === productForm.collectionId).map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <NumberField label="Gross Weight" value={productForm.grossWeight} onChange={(value) => setProductForm((prev) => ({ ...prev, grossWeight: value }))} />
                  <NumberField label="Net Weight" value={productForm.netWeight} onChange={(value) => setProductForm((prev) => ({ ...prev, netWeight: value }))} />
                  <NumberField label="Stone Weight" value={productForm.stoneWeight} onChange={(value) => setProductForm((prev) => ({ ...prev, stoneWeight: value }))} />
                  <NumberField label="Diamond Weight" value={productForm.diamondWeight} onChange={(value) => setProductForm((prev) => ({ ...prev, diamondWeight: value }))} />
                  <NumberField label="Stone Amount" value={productForm.stoneAmount} onChange={(value) => setProductForm((prev) => ({ ...prev, stoneAmount: value }))} />
                  <NumberField label="VA %" value={productForm.vaPercent} onChange={(value) => setProductForm((prev) => ({ ...prev, vaPercent: value }))} />
                  <NumberField label="VAAM" value={productForm.vaam} onChange={(value) => setProductForm((prev) => ({ ...prev, vaam: value }))} />
                  <NumberField label="Stock Quantity" value={productForm.stockQuantity} onChange={(value) => setProductForm((prev) => ({ ...prev, stockQuantity: value }))} />
                  <NumberField label="Estimated Price" value={productForm.estimatedPrice} onChange={(value) => setProductForm((prev) => ({ ...prev, estimatedPrice: value }))} />
                </div>
                <input placeholder="Purity" value={productForm.purity} onChange={(event) => setProductForm((prev) => ({ ...prev, purity: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <textarea placeholder="Description" value={productForm.description} onChange={(event) => setProductForm((prev) => ({ ...prev, description: event.target.value }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" rows={3} />
                <select value={productForm.status} onChange={(event) => setProductForm((prev) => ({ ...prev, status: event.target.value as ProductItem["status"] }))} className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={productForm.featured} onChange={(event) => setProductForm((prev) => ({ ...prev, featured: event.target.checked }))} />
                  Featured Product
                </label>

                <div className="rounded-xl border border-[#C8AD7B] bg-white p-3">
                  <p className="mb-2 text-sm font-medium">Image Management (JPG, PNG, WEBP)</p>
                  <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(event) => void onUploadImages(event.target.files)} />
                  <div className="mt-3 space-y-2">
                    {productForm.images.map((image, index) => (
                      <div key={`${image.slice(0, 20)}-${index}`} className="grid grid-cols-[56px_1fr_auto] items-center gap-2 rounded-xl border border-[#C8AD7B] p-2">
                        <img src={image} alt={`Product ${index + 1}`} className="h-12 w-12 rounded-lg object-cover" />
                        <p className="truncate text-xs text-[#5A4420]">Image {index + 1}{productForm.featuredImageIndex === index ? " (Featured)" : ""}</p>
                        <div className="flex gap-1">
                          <button onClick={() => moveImage(index, -1)} className="rounded border border-[#AA6200] px-2 text-xs">Up</button>
                          <button onClick={() => moveImage(index, 1)} className="rounded border border-[#AA6200] px-2 text-xs">Down</button>
                          <button onClick={() => setProductForm((prev) => ({ ...prev, featuredImageIndex: index }))} className="rounded border border-[#AA6200] px-2 text-xs">Featured</button>
                          <button onClick={() => removeImage(index)} className="rounded border border-red-700 px-2 text-xs text-red-700">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={onSaveProduct} className="rounded-full bg-[#AA6200] px-4 py-2 text-sm text-[#F4EDD6]">Save Product</button>
              </div>
            </div>
            <div className="rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4">
              <h2 className="text-2xl">Products</h2>
              <div className="mt-3 space-y-2">
                {db.products.map((product) => {
                  const collection = db.collections.find((item) => item.id === product.collectionId)
                  const category = db.categories.find((item) => item.id === product.categoryId)
                  return (
                    <article key={product.id} className="rounded-xl border border-[#C8AD7B] bg-white p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-[#5A4420]">{product.productCode} / {collection?.name ?? "Unknown"} / {category?.name ?? "Unknown"}</p>
                          <p className="text-xs text-[#5A4420]">Stock: {product.stockQuantity} {product.stockQuantity === 1 ? "(Only 1 Item Left badge active)" : ""}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setProductForm(product)} className="rounded-full border border-[#AA6200] px-3 py-1 text-xs text-[#AA6200]">Edit</button>
                          <button onClick={() => deleteProduct(product.id)} className="rounded-full border border-red-700 px-3 py-1 text-xs text-red-700">Delete</button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {activeTab === "quotes" && (
          <section className="rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4">
            <h2 className="text-2xl">Quote Request Management</h2>
            <div className="mt-3 space-y-3">
              {db.quoteRequests.map((quote) => (
                <QuoteRow key={quote.id} quote={quote} products={db.products} onStatusChange={updateQuoteStatus} />
              ))}
              {db.quoteRequests.length === 0 && <p className="text-sm text-[#5A4420]">No quote requests yet.</p>}
            </div>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4">
              <h2 className="text-2xl">Website Settings</h2>
              <div className="mt-3 grid gap-3">
                <input value={db.settings.whatsappNumber} onChange={(event) => updateSettings({ ...db.settings, whatsappNumber: event.target.value })} placeholder="WhatsApp number" className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <input value={db.settings.shopBanner} onChange={(event) => updateSettings({ ...db.settings, shopBanner: event.target.value })} placeholder="Shop online banner" className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <input value={db.settings.seoTitle} onChange={(event) => updateSettings({ ...db.settings, seoTitle: event.target.value })} placeholder="SEO meta title" className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <textarea value={db.settings.seoDescription} onChange={(event) => updateSettings({ ...db.settings, seoDescription: event.target.value })} placeholder="SEO meta description" className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" rows={4} />
              </div>
            </div>

            <div className="rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4">
              <h2 className="text-2xl">Admin Password</h2>
              <div className="mt-3 grid gap-3">
                <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="Current password" className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <input type="password" value={nextPassword} onChange={(event) => setNextPassword(event.target.value)} placeholder="New password" className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm" />
                <button onClick={() => void onChangePassword()} className="rounded-full bg-[#AA6200] px-4 py-2 text-sm text-[#F4EDD6]">Change Password</button>
                {passwordMessage && <p className="text-sm text-[#5A4420]">{passwordMessage}</p>}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="text-xs text-[#5A4420]">
      {label}
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 w-full rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm"
      />
    </label>
  )
}

function QuoteRow({ quote, products, onStatusChange }: { quote: QuoteRequest; products: ProductItem[]; onStatusChange: (quoteId: string, status: QuoteRequest["status"]) => void }) {
  const requested = quote.productIds
    .map((id) => products.find((item) => item.id === id))
    .filter((item) => Boolean(item))

  return (
    <article className="rounded-xl border border-[#C8AD7B] bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">{new Date(quote.date).toLocaleString()}</p>
          <p className="text-xs text-[#5A4420]">WhatsApp: {quote.customerWhatsapp}</p>
          <p className="mt-1 text-xs text-[#5A4420]">Products: {requested.map((item) => item?.productCode).join(", ") || "N/A"}</p>
        </div>
        <select
          value={quote.status}
          onChange={(event) => onStatusChange(quote.id, event.target.value as QuoteRequest["status"])}
          className="rounded-lg border border-[#C8AD7B] bg-white px-2 py-1 text-sm"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </article>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-[#7A4200]">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </article>
  )
}
