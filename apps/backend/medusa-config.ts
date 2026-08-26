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
  },
  modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          ...(process.env.R2_BUCKET && process.env.R2_ACCESS_KEY_ID
            ? [
                {
                  resolve: "@medusajs/medusa/file-s3",
                  id: "s3",
                  options: {
                    file_url: process.env.R2_FILE_URL,
                    access_key_id: process.env.R2_ACCESS_KEY_ID,
                    secret_access_key: process.env.R2_SECRET_ACCESS_KEY,
                    region: process.env.R2_REGION || "auto",
                    bucket: process.env.R2_BUCKET,
                    endpoint: process.env.R2_ENDPOINT,
                    additional_client_config: {
                      forcePathStyle: true,
                    },
                  },
                },
              ]
            : [
                {
                  resolve: "@medusajs/medusa/file-local",
                  id: "local",
                  options: {},
                },
              ]),
        ],
      },
    },
  ],
})
