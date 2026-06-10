import { useMemo, useState } from "react"
import { Link, createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/luxury/Navbar"
import { Footer } from "@/components/luxury/Footer"
import { ScrollProgress } from "@/components/luxury/Floating"
import { readShopDb } from "@/shop/store"
import { formatWeight } from "@/shop/utils"

const PAGE_SIZE = 8

export const Route = createFileRoute("/shop-online/$collectionSlug/$categorySlug")({
  component: ProductListingPage,
})

function ProductListingPage() {
  const { collectionSlug, categorySlug } = Route.useParams()
  const db = readShopDb()

  const baseCollection = db.collections.find((item) => item.slug === collectionSlug)
  const baseCategory = db.categories.find((item) => item.slug === categorySlug)

  const [collectionFilter, setCollectionFilter] = useState(collectionSlug)
  const [categoryFilter, setCategoryFilter] = useState(categorySlug)
  const [search, setSearch] = useState("")
  const [weightRange, setWeightRange] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [page, setPage] = useState(1)

  const filteredProducts = useMemo(() => {
    const products = db.products.filter((product) => product.status === "active")

    return products.filter((product) => {
      const matchCollection = collectionFilter === "all" || db.collections.find((c) => c.id === product.collectionId)?.slug === collectionFilter
      const matchCategory = categoryFilter === "all" || db.categories.find((c) => c.id === product.categoryId)?.slug === categoryFilter
      const matchSearch =
        search.trim().length === 0 ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.productCode.toLowerCase().includes(search.toLowerCase())

      const matchWeight =
        weightRange === "all" ||
        (weightRange === "0-5" && product.grossWeight <= 5) ||
        (weightRange === "5-10" && product.grossWeight > 5 && product.grossWeight <= 10) ||
        (weightRange === "10-20" && product.grossWeight > 10 && product.grossWeight <= 20) ||
        (weightRange === "20+" && product.grossWeight > 20)

      const matchPrice =
        priceRange === "all" ||
        (priceRange === "0-25000" && product.estimatedPrice <= 25000) ||
        (priceRange === "25000-75000" && product.estimatedPrice > 25000 && product.estimatedPrice <= 75000) ||
        (priceRange === "75000-150000" && product.estimatedPrice > 75000 && product.estimatedPrice <= 150000) ||
        (priceRange === "150000+" && product.estimatedPrice > 150000)

      return matchCollection && matchCategory && matchSearch && matchWeight && matchPrice
    })
  }, [db.categories, db.collections, db.products, collectionFilter, categoryFilter, search, weightRange, priceRange])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = filteredProducts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  if (!baseCollection || !baseCategory) {
    return (
      <main className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <section className="container-luxe py-32">
          <p className="text-lg">Category not found.</p>
          <Link to="/shop-online" className="mt-4 inline-block text-[#AA6200] underline">
            Back to collections
          </Link>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <section className="container-luxe pt-32 pb-6">
        <div className="rounded-[30px] bg-[#FBF3E4] p-6 shadow-elegant md:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#AA6200]">Shop Online / {baseCollection.name} / {baseCategory.name}</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Product Listing</h1>
          <p className="mt-3 max-w-3xl text-sm text-[#5A4420] md:text-base">
            Filter by collection, category, weight, and price to discover jewellery pieces tailored to your preference.
          </p>
        </div>
      </section>

      <section className="container-luxe pb-8">
        <div className="grid gap-4 rounded-[24px] border border-[#D2BC92] bg-[#FBF3E4] p-4 shadow-elegant md:grid-cols-5 md:p-6">
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            placeholder="Search by name or code"
            className="rounded-xl border border-[#D3C09C] bg-white/95 px-3 py-2 text-sm"
          />

          <select
            value={collectionFilter}
            onChange={(event) => {
              setCollectionFilter(event.target.value)
              setPage(1)
            }}
            className="rounded-xl border border-[#D3C09C] bg-white/95 px-3 py-2 text-sm"
          >
            <option value="all">All Collections</option>
            {db.collections.map((collection) => (
              <option key={collection.id} value={collection.slug}>
                {collection.name}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(event) => {
              setCategoryFilter(event.target.value)
              setPage(1)
            }}
            className="rounded-xl border border-[#D3C09C] bg-white/95 px-3 py-2 text-sm"
          >
            <option value="all">All Categories</option>
            {db.categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={weightRange}
            onChange={(event) => {
              setWeightRange(event.target.value)
              setPage(1)
            }}
            className="rounded-xl border border-[#D3C09C] bg-white/95 px-3 py-2 text-sm"
          >
            <option value="all">Weight: All</option>
            <option value="0-5">0g - 5g</option>
            <option value="5-10">5g - 10g</option>
            <option value="10-20">10g - 20g</option>
            <option value="20+">20g+</option>
          </select>

          <select
            value={priceRange}
            onChange={(event) => {
              setPriceRange(event.target.value)
              setPage(1)
            }}
            className="rounded-xl border border-[#D3C09C] bg-white/95 px-3 py-2 text-sm"
          >
            <option value="all">Price: All</option>
            <option value="0-25000">Up to 25,000</option>
            <option value="25000-75000">25,000 - 75,000</option>
            <option value="75000-150000">75,000 - 1,50,000</option>
            <option value="150000+">1,50,000+</option>
          </select>
        </div>
      </section>

      <section className="container-luxe pb-12">
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {pageItems.map((product) => {
            const collection = db.collections.find((item) => item.id === product.collectionId)
            const category = db.categories.find((item) => item.id === product.categoryId)
            if (!collection || !category) {
              return null
            }

            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[28px] border border-[#D2BC92] bg-[#FAF5EA] shadow-elegant transition-all duration-500 hover:-translate-y-1 hover:shadow-gold"
              >
                <div className="relative">
                  <img
                    src={product.images[product.featuredImageIndex]}
                    alt={product.name}
                    loading="lazy"
                    className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <p className="absolute left-3 top-3 rounded-full border border-white/45 bg-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    {collection.name}
                  </p>
                </div>

                <div className="space-y-1.5 p-5">
                  <h2 className="font-serif text-2xl text-[#1C1208] leading-tight">{product.name}</h2>
                  <p className="text-sm text-[#5A4420]">Gross Weight: {formatWeight(product.grossWeight)}</p>
                  <p className="text-sm text-[#5A4420]">{collection.name} / {category.name}</p>
                  {product.stockQuantity === 1 && (
                    <span className="inline-flex rounded-full bg-[#7A4200] px-3 py-1 text-xs font-medium text-[#F4EDD6]">
                      Only 1 Item Left
                    </span>
                  )}
                  <div className="pt-3">
                    <Link
                      to="/shop-online/$collectionSlug/$categorySlug/$productSlug"
                      params={{
                        collectionSlug: collection.slug,
                        categorySlug: category.slug,
                        productSlug: product.slug,
                      }}
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#AA6200] px-4 py-2 text-sm font-medium text-[#F4EDD6] transition-colors hover:bg-[#8F4F00]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="rounded-full border border-[#AA6200] px-4 py-1.5 text-sm"
            disabled={safePage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-[#5A4420]">Page {safePage} of {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="rounded-full border border-[#AA6200] px-4 py-1.5 text-sm"
            disabled={safePage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
      <Footer />
    </main>
  )
}
