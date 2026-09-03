import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getStore } from "@lib/data/store"
import ProductPreview from "@modules/products/components/product-preview"

export const metadata: Metadata = {
  title: "Alma Store",
  description: "Loja oficial Alma - Moda e estilo contemporaneo.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const [region, store, { collections }] = await Promise.all([
    getRegion(countryCode),
    getStore(),
    listCollections({
      fields: "id, handle, title, metadata",
    }),
  ])

  const heroCollection =
    collections?.find(
      (c: { metadata?: Record<string, unknown> | null }) =>
        Boolean(c.metadata?.hero_image)
    ) || collections?.[0]

  const storeHeroImage =
    typeof store?.metadata?.hero_image === "string"
      ? store.metadata.hero_image
      : undefined

  if (!region) {
    return <Hero collection={heroCollection} fallbackImage={storeHeroImage} />
  }

  // Busca os produtos mais recentes da loja
  const {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      limit: 12,
      fields: "*variants.calculated_price",
    },
  })

  return (
    <>
      <Hero collection={heroCollection} fallbackImage={storeHeroImage} />

      {/* Grid de 2 colunas 100% largura com cantos quadrados logo abaixo do hero */}
      <section className="w-full px-2 sm:px-4 pt-6 pb-16">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
              Produtos Selecionados
            </span>
            <h2 className="text-lg font-black uppercase tracking-tight text-black">
              Catalogo
            </h2>
          </div>
          <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
            {products?.length || 0} itens
          </span>
        </div>

        {products && products.length > 0 ? (
          <ul className="grid grid-cols-2 gap-2 sm:gap-4 w-full">
            {products.map((product) => (
              <li key={product.id} className="w-full">
                <ProductPreview product={product} region={region} isFeatured />
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center text-sm text-neutral-500">
            Nenhum produto cadastrado ainda.
          </div>
        )}
      </section>
    </>
  )
}
