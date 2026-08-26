import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

import AlmaLogo from "@modules/common/components/alma-logo"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions).catch(() => null),
    listLocales().catch(() => null),
    getLocale().catch(() => null),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Top header bar - ultra slim */}
      <header className="relative h-12 mx-auto border-b border-[#ebebeb] bg-white">
        <nav className="content-container flex items-center justify-between w-full h-full">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex items-center">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex items-center hover:opacity-70 transition-opacity"
              data-testid="nav-store-link"
            >
              <AlmaLogo className="h-5 sm:h-5.5 w-auto text-black" />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-5 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-4 h-full">
              <LocalizedClientLink
                className="text-[11px] uppercase tracking-widest font-semibold text-black hover:opacity-60 transition-opacity"
                href="/store"
                data-testid="nav-store-catalog-link"
              >
                Loja
              </LocalizedClientLink>
              <LocalizedClientLink
                className="text-[11px] uppercase tracking-widest font-semibold text-black hover:opacity-60 transition-opacity border border-black px-3 py-1"
                href="/account"
                data-testid="nav-account-link"
              >
                Minha Conta
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-[11px] uppercase tracking-widest font-semibold text-black hover:opacity-60 transition-opacity flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Carrinho (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>

      {/* Category navigation bar - ultra slim */}
      <div className="hidden small:block border-b border-[#ebebeb] bg-white">
        <div className="content-container">
          <div className="flex items-center justify-center gap-x-8 h-8">
            <LocalizedClientLink
              href="/store"
              className="text-[11px] uppercase tracking-wider font-semibold text-black hover:opacity-60 transition-opacity"
            >
              Novidades
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="text-[11px] uppercase tracking-wider font-semibold text-black hover:opacity-60 transition-opacity"
            >
              Vestuario
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="text-[11px] uppercase tracking-wider font-semibold text-black hover:opacity-60 transition-opacity"
            >
              Calcados
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="text-[11px] uppercase tracking-wider font-semibold text-black hover:opacity-60 transition-opacity"
            >
              Acessorios
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="text-[11px] uppercase tracking-wider font-semibold text-black hover:opacity-60 transition-opacity"
            >
              Colecoes
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="text-[11px] uppercase tracking-wider font-semibold text-black hover:opacity-60 transition-opacity"
            >
              Editorial
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Announcement ticker - ultra slim */}
      <div className="bg-[#24963C] overflow-hidden whitespace-nowrap">
        <div className="animate-ticker inline-flex">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-white text-[11px] font-semibold uppercase tracking-wider px-6 py-1 inline-block">
              Frete gratis acima de R$200 &nbsp;&bull;&nbsp; Novos produtos toda semana &nbsp;&bull;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
