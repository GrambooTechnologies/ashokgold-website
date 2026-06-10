import { useMemo, useState } from "react"
import { Link, createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/luxury/Navbar"
import { Footer } from "@/components/luxury/Footer"
import { ScrollProgress } from "@/components/luxury/Floating"
import { useCart } from "@/shop/cart-context"
import { readShopDb, writeShopDb } from "@/shop/store"
import { buildWhatsAppUrl, formatWeight, randomId } from "@/shop/utils"

export const Route = createFileRoute("/shop-online/cart")({
  component: CartPage,
})

function CartPage() {
  const { productIds, remove, clear } = useCart()
  const [customerWhatsapp, setCustomerWhatsapp] = useState("")

  const db = readShopDb()
  const products = useMemo(
    () => productIds
      .map((id) => db.products.find((product) => product.id === id))
      .filter((product) => Boolean(product)),
    [db.products, productIds],
  )

  const requestQuote = () => {
    if (products.length === 0) {
      return
    }

    const itemsText = products
      .map((product, index) => {
        if (!product) {
          return ""
        }

        return `${index + 1}.\nProduct Name: ${product.name}\nProduct Code: ${product.productCode}\nGross Weight: ${formatWeight(product.grossWeight)}`
      })
      .join("\n\n")

    const message = `Hello,\n\nI would like a quotation for the following products:\n\n${itemsText}\n\nPlease send me the quotation.`

    const quoteId = randomId("quote")
    const selectedProducts = products.filter((product): product is NonNullable<typeof product> => Boolean(product))

    const nextDb = {
      ...db,
      quoteRequests: [
        {
          id: quoteId,
          date: new Date().toISOString(),
          customerWhatsapp: customerWhatsapp.trim() || "not-provided",
          productIds: selectedProducts.map((product) => product.id),
          status: "new" as const,
        },
        ...db.quoteRequests,
      ],
    }

    writeShopDb(nextDb)
    window.open(buildWhatsAppUrl(db.settings.whatsappNumber, message), "_blank")
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <section className="container-luxe pt-32 pb-8">
        <h1 className="text-4xl md:text-5xl">Quotation Cart</h1>
        <p className="mt-2 text-sm text-[#5A4420]">Review items and request a consolidated quote over WhatsApp.</p>
      </section>

      <section className="container-luxe pb-20">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-[#C8AD7B] bg-[#FAF5EA] p-8 text-center">
            <p className="text-lg">Your cart is empty.</p>
            <Link to="/shop-online" className="mt-4 inline-flex rounded-full bg-[#AA6200] px-4 py-2 text-sm text-[#F4EDD6]">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {products.map((product) => {
                if (!product) {
                  return null
                }

                const collection = db.collections.find((item) => item.id === product.collectionId)
                const category = db.categories.find((item) => item.id === product.categoryId)

                return (
                  <article key={product.id} className="grid gap-4 rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-4 md:grid-cols-[120px_1fr_auto]">
                    <img src={product.images[product.featuredImageIndex]} alt={product.name} className="h-24 w-full rounded-xl object-cover md:w-28" loading="lazy" />
                    <div>
                      <h2 className="font-serif text-2xl">{product.name}</h2>
                      <p className="text-sm text-[#5A4420]">Code: {product.productCode}</p>
                      <p className="text-sm text-[#5A4420]">Gross Weight: {formatWeight(product.grossWeight)}</p>
                      <p className="text-sm text-[#5A4420]">{collection?.name ?? "Collection"} / {category?.name ?? "Category"}</p>
                    </div>
                    <div className="flex items-start">
                      <button
                        onClick={() => remove(product.id)}
                        className="rounded-full border border-[#AA6200] px-3 py-1 text-xs font-medium text-[#AA6200]"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-[#C8AD7B] bg-[#FAF5EA] p-5">
              <label htmlFor="customerWhatsapp" className="mb-2 block text-sm font-medium text-[#1C1208]">
                Customer WhatsApp Number
              </label>
              <input
                id="customerWhatsapp"
                value={customerWhatsapp}
                onChange={(event) => setCustomerWhatsapp(event.target.value)}
                placeholder="Enter customer number"
                className="w-full rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm"
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={requestQuote} className="rounded-full bg-[#AA6200] px-4 py-2 text-sm font-medium text-[#F4EDD6]">
                  Get Quote
                </button>
                <button onClick={clear} className="rounded-full border border-[#AA6200] px-4 py-2 text-sm font-medium text-[#AA6200]">
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </section>
      <Footer />
    </main>
  )
}
