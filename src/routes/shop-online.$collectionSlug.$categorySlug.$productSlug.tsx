import { useState } from "react"
import { Link, createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/luxury/Navbar"
import { Footer } from "@/components/luxury/Footer"
import { ScrollProgress } from "@/components/luxury/Floating"
import { useCart } from "@/shop/cart-context"
import { randomId, formatWeight, buildWhatsAppUrl } from "@/shop/utils"
import { readShopDb, writeShopDb } from "@/shop/store"

export const Route = createFileRoute("/shop-online/$collectionSlug/$categorySlug/$productSlug")({
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { collectionSlug, categorySlug, productSlug } = Route.useParams()
  const [selected, setSelected] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [openViewer, setOpenViewer] = useState(false)
  const { add } = useCart()

  const db = readShopDb()
  const collection = db.collections.find((item) => item.slug === collectionSlug)
  const category = db.categories.find((item) => item.slug === categorySlug)
  const product = db.products.find((item) => item.slug === productSlug)

  if (!collection || !category || !product) {
    return (
      <main className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <section className="container-luxe py-32">
          <p className="text-lg">Product not found.</p>
          <Link to="/shop-online" className="mt-4 inline-block text-[#AA6200] underline">
            Back to collections
          </Link>
        </section>
        <Footer />
      </main>
    )
  }

  const openDetailsInWhatsApp = () => {
    const message = `Hello,\n\nI am interested in this jewellery item.\n\nProduct Name: ${product.name}\nProduct Code: ${product.productCode}\nCollection: ${collection.name}\nCategory: ${category.name}\nGross Weight: ${formatWeight(product.grossWeight)}\nNet Weight: ${formatWeight(product.netWeight)}\nVA%: ${product.vaPercent}\n\nPlease provide more details.`

    const quoteId = randomId("quote")
    const nextDb = {
      ...db,
      quoteRequests: [
        {
          id: quoteId,
          date: new Date().toISOString(),
          customerWhatsapp: db.settings.whatsappNumber,
          productIds: [product.id],
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
      <section className="container-luxe pt-32 pb-14">
        <div className="mb-6 rounded-[28px] bg-[#FBF3E4] p-5 shadow-elegant md:p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-[#AA6200]">Shop Online / {collection.name} / {category.name}</p>
          <h1 className="mt-2 text-3xl leading-tight md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#D3C09C] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[#7A4200]">
              Product Code: {product.productCode}
            </span>
            <span className="rounded-full border border-[#D3C09C] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[#7A4200]">
              Gross Weight: {formatWeight(product.grossWeight)}
            </span>
            <span className="rounded-full border border-[#D3C09C] bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[#7A4200]">
              Purity: {product.purity}
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[30px] border border-[#D2BC92] bg-[#FBF3E4] p-4 shadow-elegant md:p-5">
            <button
              onClick={() => setOpenViewer(true)}
              className="relative block w-full overflow-hidden rounded-[24px] border border-[#D2BC92] bg-[#FAF5EA]"
            >
              <img
                src={product.images[selected]}
                alt={product.name}
                className="h-[420px] w-full object-cover"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span className="absolute bottom-3 right-3 rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs text-white backdrop-blur-sm">Fullscreen</span>
            </button>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={`${product.id}-${index}`}
                  onClick={() => setSelected(index)}
                  className={`overflow-hidden rounded-xl border transition-all ${selected === index ? "border-[#AA6200] shadow-gold" : "border-[#C8AD7B] hover:border-[#B88944]"}`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="h-20 w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-[#D2BC92] bg-[#FAF5EA] p-6 shadow-elegant md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#AA6200]">Specifications</p>
            <h2 className="mt-2 text-3xl">Craft Details</h2>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <InfoRow label="Gross Weight" value={formatWeight(product.grossWeight)} />
              <InfoRow label="Net Weight" value={formatWeight(product.netWeight)} />
              <InfoRow label="Stone Weight" value={formatWeight(product.stoneWeight)} />
              <InfoRow label="Diamond Weight" value={formatWeight(product.diamondWeight)} />
              <InfoRow label="Stone Amount" value={`INR ${product.stoneAmount}`} />
              <InfoRow label="VA%" value={String(product.vaPercent)} />
              <InfoRow label="VAAM" value={`INR ${product.vaam}`} />
              <InfoRow label="Purity" value={product.purity} />
            </div>

            <div className="mt-5 rounded-xl border border-[#D3C09C] bg-white px-4 py-3 text-sm text-[#5A4420]">
              <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-[#7A4200]">Description</p>
              {product.description}
            </div>

            {product.stockQuantity === 1 && (
              <span className="mt-4 inline-flex rounded-full bg-[#7A4200] px-3 py-1 text-xs font-medium text-[#F4EDD6]">Only 1 Item Left</span>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={openDetailsInWhatsApp}
                className="rounded-full border border-[#AA6200] px-4 py-2.5 text-sm font-medium text-[#AA6200] transition-colors hover:bg-[#FFF3DD]"
              >
                Get Details
              </button>
              <button
                onClick={() => add(product.id)}
                className="rounded-full bg-[#AA6200] px-4 py-2.5 text-sm font-medium text-[#F4EDD6] shadow-gold transition-colors hover:bg-[#8F4F00]"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {openViewer && (
        <div className="fixed inset-0 z-[80] bg-black/85 p-6">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-4">
            <div className="flex justify-end gap-2">
              <button onClick={() => setZoom((prev) => Math.max(1, prev - 0.25))} className="rounded-full bg-white px-3 py-1 text-sm">-</button>
              <button onClick={() => setZoom((prev) => Math.min(3, prev + 0.25))} className="rounded-full bg-white px-3 py-1 text-sm">+</button>
              <button onClick={() => setOpenViewer(false)} className="rounded-full bg-white px-3 py-1 text-sm">Close</button>
            </div>
            <div className="flex-1 overflow-auto rounded-3xl bg-black/50 p-4">
              <img
                src={product.images[selected]}
                alt={product.name}
                className="mx-auto max-h-full w-auto origin-center object-contain transition-transform"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#C8AD7B] bg-white px-3 py-2">
      <p className="text-[11px] uppercase tracking-[0.12em] text-[#7A4200]">{label}</p>
      <p className="mt-1 font-medium text-[#1C1208]">{value}</p>
    </div>
  )
}
