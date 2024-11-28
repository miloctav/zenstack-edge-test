import { neonConfig, Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

declare global {
  var prisma: PrismaClient | undefined
}

const isEdge = typeof WebSocket !== 'undefined'
const isNode = typeof process !== 'undefined' && process.versions?.node

if (isNode) {
  neonConfig.webSocketConstructor = ws
} else if (isEdge) {
  neonConfig.webSocketConstructor = WebSocket
}

neonConfig.pipelineConnect = false

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool)
  return new PrismaClient({ adapter })
}

export const prisma = globalThis.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}