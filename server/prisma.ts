import { neonConfig, Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

declare global {
  var prisma: PrismaClient | undefined
}

const isEdge = typeof WebSocket !== 'undefined'
const isNode = typeof process !== 'undefined' && process.versions?.node

console.log('Environment:', { isEdge, isNode })

if (isNode) {
  console.log('Configuring for Node environment')
  neonConfig.webSocketConstructor = ws
} else if (isEdge) {
  console.log('Configuring for Edge environment')
  neonConfig.webSocketConstructor = WebSocket
}

neonConfig.pipelineConnect = false

async function createPrismaClient() {
  console.log('=== CREATE PRISMA CLIENT START ===')
  
  try {
    if (isEdge) {
      console.log('Loading WASM module...')
      await import('@prisma/client/wasm')
      console.log('WASM loaded ✓')
    }

    const connectionString = process.env.DATABASE_URL
    console.log('Creating new pool and client...')
    
    const pool = new Pool({ connectionString })
    const adapter = new PrismaNeon(pool)
    const client = new PrismaClient({ 
      adapter,
      log: ['query', 'info', 'warn', 'error']
    })

    return client
  } catch (error) {
    console.error('Error creating client:', error)
    throw error
  }
}

let prismaInstance: PrismaClient | undefined

// Ne pas cacher l'instance, en créer une nouvelle à chaque fois
export function getPrisma() {
  console.log('Getting fresh Prisma instance...')
  return createPrismaClient()
}

// Exporter une fonction au lieu d'une instance
export const prisma = getPrisma