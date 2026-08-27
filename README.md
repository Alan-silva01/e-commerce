# Alma Store — E-commerce Full Stack

<p align="center">
  <b>Um projeto prático e completo de E-commerce moderno desenvolvido para aprendizado e aplicação real.</b>
</p>

<p align="center">
  <a href="https://alma-storefront.ljiuf9.easypanel.host/br" target="_blank">
    <img src="https://img.shields.io/badge/Loja_Online-Visitar_Storefront-black?style=for-the-badge" alt="Loja Online" />
  </a>
  <a href="https://alma-backend.ljiuf9.easypanel.host/app" target="_blank">
    <img src="https://img.shields.io/badge/Painel_Admin-Medusa_Dashboard-8A2BE2?style=for-the-badge" alt="Painel Admin" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js%2015-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Medusa%20v2-8A2BE2?style=flat-square&logo=medusa&logoColor=white" alt="MedusaJS" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Cloudflare_R2-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare R2" />
  <img src="https://img.shields.io/badge/Docker_%2F_EasyPanel-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker EasyPanel" />
</p>

---

## Sobre o Projeto e Minha Jornada

> *"Não sou desenvolvedor de formação, mas sou um apaixonado por tecnologia e programação. Este repositório representa minha jornada prática de colocar a mão na massa: pesquisando, configurando servidores VPS, orquestrando containers, ajustando código, integrando serviços na nuvem e aprendendo como construir e manter um e-commerce profissional do zero à produção."*

O **Alma Store** foi construído a partir da base do **Medusa V2** (arquitetura headless) com **Next.js 15**. Ao longo do desenvolvimento, venho customizando a experiência visual, otimizando o carregamento de mídia na nuvem e mantendo toda a infraestrutura em produção real.

---

## Demonstração Visual da Aplicação

### Storefront (Experiência do Cliente)

<table align="center" width="100%">
  <tr>
    <td width="50%" align="center">
      <b>Catálogo de Produtos</b><br/><br/>
      <img src="https://res.cloudinary.com/ddhlqymvf/image/upload/v1787845168/Captura_de_Tela_2026-08-27_a%CC%80s_12.34.54_PM_mb1nva.png" alt="Catálogo de Produtos" width="100%"/>
    </td>
    <td width="50%" align="center">
      <b>Carrinho de Compras</b><br/><br/>
      <img src="https://res.cloudinary.com/ddhlqymvf/image/upload/v1787845168/Captura_de_Tela_2026-08-27_a%CC%80s_12.35.09_PM_lczaip.png" alt="Carrinho de Compras" width="100%"/>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>Checkout e Pagamento</b><br/><br/>
      <img src="https://res.cloudinary.com/ddhlqymvf/image/upload/v1787845168/Captura_de_Tela_2026-08-27_a%CC%80s_12.35.16_PM_ya65vd.png" alt="Checkout e Pagamento" width="100%"/>
    </td>
    <td width="50%" align="center">
      <b>Painel do Cliente (Minha Conta)</b><br/><br/>
      <img src="https://res.cloudinary.com/ddhlqymvf/image/upload/v1787845168/Captura_de_Tela_2026-08-27_a%CC%80s_12.35.31_PM_fg7ug9.png" alt="Minha Conta" width="100%"/>
    </td>
  </tr>
</table>

### Painel Administrativo (Medusa Admin)

<table align="center" width="100%">
  <tr>
    <td width="50%" align="center">
      <b>Gestão de Produtos e Mídia (Cloudflare R2)</b><br/><br/>
      <img src="https://res.cloudinary.com/ddhlqymvf/image/upload/v1787845274/Captura_de_Tela_2026-08-27_a%CC%80s_12.41.03_PM_iqvq2x.png" alt="Gestão de Produtos no Admin" width="100%"/>
    </td>
    <td width="50%" align="center">
      <b>Gestão de Inventário e Estoque</b><br/><br/>
      <img src="https://res.cloudinary.com/ddhlqymvf/image/upload/v1787845274/Captura_de_Tela_2026-08-27_a%CC%80s_12.40.55_PM_ttkhqa.png" alt="Gestão de Inventário no Admin" width="100%"/>
    </td>
  </tr>
</table>

---

## O que já foi implementado e Infraestrutura

### 1. Deploy em Produção (VPS e EasyPanel)
- Servidor VPS configurado com **EasyPanel** e orquestração em containers **Docker**.
- **Backend (Medusa v2)** rodando com PostgreSQL e Redis.
- **Storefront (Next.js 15)** com Server Side Rendering (SSR) e revalidação incremental (ISR).
- **Links em Produção**:
  - **Loja Online**: [https://alma-storefront.ljiuf9.easypanel.host/br](https://alma-storefront.ljiuf9.easypanel.host/br)
  - **Painel Admin**: [https://alma-backend.ljiuf9.easypanel.host/app](https://alma-backend.ljiuf9.easypanel.host/app)

### 2. Redesign do Storefront (Estilo Grailed / Minimalista)
- Identidade visual moderna inspirada na estética minimalista da *Grailed*.
- **Header ultra-slim**, ticker de novidades/frete, barra de categorias compacta e tipografia marcante.
- Logo vetorial (`SVG`) limpa e dinâmica com suporte a inversão de cores (`currentColor`).
- Grade de produtos flat, sem sombras pesadas e com navegação fluida.

### 3. Storage de Alta Performance com Cloudflare R2
- Conexão do módulo `@medusajs/medusa/file-s3` apontando para bucket **Cloudflare R2**.
- CDN global com latência ultra-baixa no Brasil e taxa de transferência (*egress*) zerada.
- Otimização automática de imagens via Next.js Image Optimizer com suporte a domínios R2.

### 4. Gestão de Catálogo e Estoque
- Cadastro de produtos, múltiplas fotos em alta resolução, opções de tamanhos, variantes e controle de estoque direto pelo painel administrativo.

---

## Próximos Passos (Roadmap)

- [x] Configuração de VPS e deploy do monorepo via Docker/EasyPanel
- [x] Redesign do layout do Storefront (estilo minimalista)
- [x] Integração de Storage S3/Cloudflare R2 para fotos de produtos
- [ ] Integração com gateway de pagamentos (Stripe / Mercado Pago / Asaas)
- [ ] Configuração de métodos de envio e cálculo de frete nacional (Correios / Melhor Envio)
- [ ] Autenticação de clientes e fluxo completo de checkout e rastreio de pedidos

---

## Estrutura do Monorepo (Turborepo)

```text
.
├── apps/
│   ├── backend/          # API Medusa v2 (@dtc/backend)
│   │   ├── medusa-config.ts  # Configuração de Banco, CORS, Módulos e Cloudflare R2
│   │   └── src/              # Customizações de rotas, workflows e admin
│   └── storefront/       # Frontend Next.js 15 App Router (@dtc/storefront)
│       ├── src/app/          # Rotas e páginas (Home, Produtos, Categorias, Cart)
│       ├── src/modules/      # Componentes modulares, UI, Header, Footer, Galeria
│       └── next.config.js    # Otimização de imagens e domínios remotos R2
├── turbo.json            # Pipeline do Turborepo (build, dev, lint)
└── package.json          # Gerenciamento de dependências
```

---

## Como Rodar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/Alan-silva01/e-commerce.git
cd e-commerce
npm install
```

### 2. Configurar variáveis de ambiente
- Copie `apps/backend/.env.template` para `apps/backend/.env` e preencha as credenciais do banco e do Cloudflare R2.
- Copie `apps/storefront/.env.template` para `apps/storefront/.env.local`.

### 3. Iniciar em desenvolvimento
```bash
# Rodar todos os apps
npm run dev

# Ou rodar apenas o Storefront
npm run storefront:dev
```

---

<p align="center">
  Desenvolvido por <b>Alan Silva</b>
</p>
