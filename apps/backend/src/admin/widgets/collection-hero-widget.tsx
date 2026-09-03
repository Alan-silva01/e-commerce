import { useState, useRef } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, toast } from "@medusajs/ui"
import { ArrowUpTray, Trash } from "@medusajs/icons"

type CollectionData = {
  id: string
  title?: string
  metadata?: Record<string, unknown> | null
}

const CollectionHeroWidget = ({ data }: { data?: CollectionData }) => {
  const collection = data
  const metadata = collection?.metadata || {}
  const [heroImage, setHeroImage] = useState<string>(
    typeof metadata.hero_image === "string" ? metadata.hero_image : ""
  )
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  if (!collection?.id) {
    return null
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("files", file)

      // 1. Upload the file to Medusa (which uploads directly to S3 / Cloudflare R2)
      const uploadRes = await fetch("/admin/uploads", {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      if (!uploadRes.ok) {
        throw new Error("Falha ao fazer upload da imagem.")
      }

      const uploadJson = await uploadRes.json()
      const uploadedUrl = uploadJson.files?.[0]?.url

      if (!uploadedUrl) {
        throw new Error("URL da imagem não encontrada na resposta do upload.")
      }

      // 2. Update collection metadata with the uploaded image URL
      const updateRes = await fetch(`/admin/collections/${collection.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          metadata: {
            ...collection.metadata,
            hero_image: uploadedUrl,
          },
        }),
      })

      if (!updateRes.ok) {
        throw new Error("Falha ao salvar metadados da coleção.")
      }

      setHeroImage(uploadedUrl)
      toast.success("Sucesso", {
        description: "Imagem do Hero atualizada e salva com sucesso!",
      })
    } catch (error: any) {
      toast.error("Erro", {
        description: error.message || "Erro ao processar imagem.",
      })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveImage = async () => {
    try {
      setIsUploading(true)
      const newMetadata = { ...collection.metadata }
      delete newMetadata.hero_image

      const updateRes = await fetch(`/admin/collections/${collection.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          metadata: newMetadata,
        }),
      })

      if (!updateRes.ok) {
        throw new Error("Falha ao remover imagem do Hero.")
      }

      setHeroImage("")
      toast.success("Sucesso", {
        description: "Imagem do Hero removida da coleção.",
      })
    } catch (error: any) {
      toast.error("Erro", {
        description: error.message || "Erro ao remover imagem.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Container className="p-6 divide-y divide-dashed">
      <div className="flex items-center justify-between pb-4">
        <div>
          <Heading level="h2" className="text-base font-semibold">
            Banner do Hero (Página Inicial)
          </Heading>
          <p className="text-xs text-ui-fg-subtle mt-1">
            Faça upload da imagem que aparecerá no destaque da loja quando esta coleção for exibida.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            size="small"
            variant="secondary"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <ArrowUpTray className="mr-2" />
            {isUploading ? "Enviando..." : heroImage ? "Trocar Imagem" : "Subir Imagem"}
          </Button>
        </div>
      </div>

      <div className="pt-4">
        {heroImage ? (
          <div className="relative rounded-lg overflow-hidden border border-ui-border-base bg-neutral-900 group aspect-[21/9] max-h-64 flex items-center justify-center">
            <img
              src={heroImage}
              alt="Banner do Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <Button
                size="small"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                Trocar Imagem
              </Button>
              <Button
                size="small"
                variant="danger"
                onClick={handleRemoveImage}
                disabled={isUploading}
              >
                <Trash className="mr-1" />
                Remover
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-ui-border-base rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-ui-border-interactive transition-colors bg-ui-bg-subtle"
          >
            <div className="w-12 h-12 rounded-full bg-ui-bg-base border border-ui-border-base flex items-center justify-center mb-3">
              <ArrowUpTray className="text-ui-fg-muted" />
            </div>
            <p className="text-sm font-medium text-ui-fg-base">
              Clique para selecionar a imagem do Hero
            </p>
            <p className="text-xs text-ui-fg-muted mt-1">
              PNG, JPG, WEBP de alta resolução (ideal: 1920x800 ou similar)
            </p>
          </div>
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product_collection.details.after",
})

export default CollectionHeroWidget
