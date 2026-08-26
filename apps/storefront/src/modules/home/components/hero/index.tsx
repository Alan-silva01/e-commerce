import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative w-full h-[70vh] bg-black overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-semibold mb-4">
          Alma Store
        </span>
        <Heading
          level="h1"
          className="text-white text-4xl small:text-6xl font-black uppercase tracking-tight leading-none mb-6"
        >
          Nova Colecao
        </Heading>
        <Heading
          level="h2"
          className="text-neutral-400 text-sm small:text-base uppercase tracking-[0.2em] font-normal mb-10 max-w-lg"
        >
          Pecas exclusivas selecionadas para voce
        </Heading>
        <LocalizedClientLink href="/store">
          <button className="bg-white text-black text-sm font-bold uppercase tracking-widest px-10 py-4 hover:bg-neutral-200 transition-colors">
            Ver Agora
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
