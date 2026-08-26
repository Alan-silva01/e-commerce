import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || "https://alma-backend.ljiuf9.easypanel.host",
    disable: process.env.SHOULD_DISABLE_ADMIN === 'true',
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      connection: {
        ssl: false,
      },
    },
    redisUrl: process.env.REDIS_URL,
    workerMode: (process.env.MEDUSA_WORKER_MODE as 'shared' | 'worker' | 'server') || 'server',
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000,https://docs.medusajs.com",
      adminCors: process.env.ADMIN_CORS || "http://localhost:5173,http://localhost:9000,https://docs.medusajs.com",
      authCors: process.env.AUTH_CORS || "http://localhost:5173,http://localhost:9000,http://localhost:8000,https://docs.medusajs.com",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
