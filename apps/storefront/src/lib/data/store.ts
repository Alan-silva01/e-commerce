"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const getStore = async () => {
  const next = {
    ...(await getCacheOptions("store")),
  }

  return sdk.client
    .fetch<{ store: HttpTypes.AdminStore }>(`/store`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ store }) => store)
    .catch(() => null)
}
