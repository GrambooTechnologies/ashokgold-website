import { Link, createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/luxury/Navbar"
import { Footer } from "@/components/luxury/Footer"
import { ScrollProgress } from "@/components/luxury/Floating"
import { readShopDb } from "@/shop/store"

export const Route = createFileRoute("/shop-online")({
  head: () => ({
    meta: [
      { title: "Shop Online | Ashok Gold & Diamonds" },
      {
        name: "description",
        content:
          "Browse gold, silver, platinum and diamond collections and request a quotation instantly via WhatsApp.",
      },
    ],
  }),
  component: ShopCollectionsPage,
})

function ShopCollectionsPage() {
  const db = readShopDb()
  const collections = db.collections
    .filter((collection) => collection.status === "active")
    .sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <section className="container-luxe pt-32 pb-10">
        <div className="glass rounded-3xl p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#AA6200]">Shop Online</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Jewellery Collections</h1>
          <p className="mt-3 max-w-3xl text-sm md:text-base text-[#5A4420]">
            Explore curated collections and move to categories, products, and details in a seamless quotation flow.
          </p>
        </div>
      </section>

      <section className="container-luxe pb-20">
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection) => {
            const productCount = db.products.filter(
              (product) => product.collectionId === collection.id && product.status === "active",
            ).length

            return (
              <Link
                key={collection.id}
                to="/shop-online/$collectionSlug"
                params={{ collectionSlug: collection.slug }}
                className="group relative overflow-hidden rounded-[28px] border border-[#D2BC92] bg-[#FAF5EA] shadow-elegant transition-all duration-500 hover:-translate-y-1.5 hover:shadow-gold"
              >
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/25 to-black/70" />
                <img
                  src={collection.image}
                  alt={collection.name}
                  loading="lazy"
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-full border border-white/35 bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {productCount} Products
                </div>

                <div className="absolute inset-x-0 bottom-0 z-20 p-5">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-[#F7E8CF]/90">Jewellery Collection</p>
                  <h2 className="mt-1 font-serif text-4xl leading-none text-[#FFF8EA] drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
                    {collection.name}
                  </h2>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E8D2AA]/80 bg-[#FFF7E8]/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6E3F00] transition-colors duration-500 group-hover:bg-white">
                    Explore Now
                    <span aria-hidden="true">+</span>
                  </div>
                </div>

                <div className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#F3D39B]/35 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />
              </Link>
            )
          })}
        </div>
      </section>
      <Footer />
    </main>
  )
}
