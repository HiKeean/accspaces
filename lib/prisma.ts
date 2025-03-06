import { PrismaClient } from "@prisma/client"

let sslCert: string | undefined = undefined

// Langsung ambil CA_CERT dari environment variable
if (process.env.CA_CERT) {
  sslCert = process.env.CA_CERT
}

let databaseUrl = process.env.DATABASE_URL || ""

if (sslCert) {
  if (!databaseUrl.includes("sslrootcert=")) {
    // Menambahkan sslrootcert dengan nilai CA_CERT langsung
    databaseUrl += databaseUrl.includes("?")
      ? `&sslmode=verify-full&sslrootcert=${sslCert}`
      : `?sslmode=verify-full&sslrootcert=${sslCert}`
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
