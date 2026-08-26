import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-[#ebebeb] w-full bg-white">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-8 xsmall:flex-row items-start justify-between py-16">
          <div className="flex flex-col gap-4">
            <LocalizedClientLink
              href="/"
              className="text-[22px] font-black tracking-tight text-black uppercase"
            >
              ALMA
            </LocalizedClientLink>
            <Text className="text-xs text-neutral-500 max-w-[280px] leading-relaxed">
              Sua loja exclusiva de moda e estilo. Pecas curadas com qualidade e autenticidade.
            </Text>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-[11px] uppercase tracking-widest font-bold text-black">
                  Categorias
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-neutral-500 txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-black transition-colors",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-black transition-colors"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-[11px] uppercase tracking-widest font-bold text-black">
                  Colecoes
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-neutral-500 txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-black transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="text-[11px] uppercase tracking-widest font-bold text-black">
                Links
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-neutral-500 txt-small">
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="hover:text-black transition-colors"
                  >
                    Loja
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="hover:text-black transition-colors"
                  >
                    Minha Conta
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/cart"
                    className="hover:text-black transition-colors"
                  >
                    Carrinho
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full py-6 border-t border-[#ebebeb] justify-between items-center text-neutral-400">
          <Text className="text-xs">
            &copy; {new Date().getFullYear()} Alma Store. Todos os direitos reservados.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
