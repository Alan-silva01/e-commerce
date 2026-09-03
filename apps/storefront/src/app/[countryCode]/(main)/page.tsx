import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getStore } from "@lib/data/store"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
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

  if (!collections || !region) {
    return <Hero collection={heroCollection} fallbackImage={storeHeroImage} />
  }

  return (
    <>
      <Hero collection={heroCollection} fallbackImage={storeHeroImage} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
