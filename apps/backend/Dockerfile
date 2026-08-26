FROM node:20-slim AS builder
WORKDIR /app

# Instalar dependencias de build para pacotes nativos (bcrypt, sharp, etc.)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN npm install

COPY . .
RUN npx medusa build

# --- Production ---
FROM node:20-slim
WORKDIR /app

COPY --from=builder /app/.medusa/server ./
RUN npm install --omit=dev

EXPOSE 9000
CMD ["npx", "medusa", "start"]
