import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

let sslCertPath: string | undefined = undefined

if (process.env.CA_CERT) {
  const tempDir = path.join(process.cwd(), "tmp")

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  sslCertPath = path.join(tempDir, "ca-cert.pem")

  fs.writeFileSync(sslCertPath, process.env.CA_CERT)
  fs.chmodSync(sslCertPath, 0o600)
}

let databaseUrl = process.env.DATABASE_URL || ""

if (sslCertPath) {
  if (!databaseUrl.includes("sslrootcert=")) {
    databaseUrl += databaseUrl.includes("?")
      ? `&sslmode=verify-full&sslrootcert=${sslCertPath}`
      : `?sslmode=verify-full&sslrootcert=${sslCertPath}`
  }
}

// 🔥 Simpan Prisma Client di global (hanya di development)
const globalForPrisma = global as unknown as { prisma?: PrismaClient }

// 🔥 Gunakan instance yang sudah ada atau buat yang baru
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: ["query", "info", "warn", "error"],
  })

// 🔥 Simpan instance Prisma di global hanya saat development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
