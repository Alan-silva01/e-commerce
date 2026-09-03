import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type HeroProps = {
  collection?: HttpTypes.StoreCollection
  fallbackImage?: string
}

const Hero = ({ collection, fallbackImage }: HeroProps) => {
  const metadata = (collection?.metadata || {}) as Record<string, unknown>
  const heroImage =
    (typeof metadata.hero_image === "string" ? metadata.hero_image : null) ||
    fallbackImage ||
    null
  const heroTitle = (typeof metadata.hero_title === "string" ? metadata.hero_title : null) || collection?.title || "Nova Colecao"
  const heroSubtitle = (typeof metadata.hero_subtitle === "string" ? metadata.hero_subtitle : null) || "Pecas exclusivas selecionadas para voce"
  const targetLink = collection?.handle ? `/collections/${collection.handle}` : "/store"

  return (
    <div className="relative w-full h-[70vh] bg-black overflow-hidden flex items-center justify-center">
      {/* Background Image if uploaded, otherwise fallback gradient mesh */}
      {heroImage ? (
        <>
          <Image
            src={heroImage}
            alt={heroTitle}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Subtle dark gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-300 font-semibold mb-4">
          Alma Store
        </span>
        <Heading
          level="h1"
          className="text-white text-4xl small:text-6xl font-black uppercase tracking-tight leading-none mb-6 drop-shadow-md"
        >
          {heroTitle}
        </Heading>
        <Heading
          level="h2"
          className="text-neutral-300 text-sm small:text-base uppercase tracking-[0.2em] font-normal mb-10 max-w-lg drop-shadow"
        >
          {heroSubtitle}
        </Heading>
        <LocalizedClientLink href={targetLink}>
          <button className="bg-white text-black text-sm font-bold uppercase tracking-widest px-10 py-4 hover:bg-neutral-200 transition-colors shadow-lg">
            Ver Agora
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
