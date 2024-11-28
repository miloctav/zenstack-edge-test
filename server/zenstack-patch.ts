import { PrismaClient } from '@prisma/client'

function createEnhancedProxy(target: any) {
  return new Proxy(target, {
    get(target, prop) {
      const value = (target as any)[prop];
      
      if (typeof value !== 'function') {
        return value;
      }

      return async function (this: any, ...args: any[]) {
        // Force la résolution de toutes les promesses
        const result = await Promise.resolve(value.apply(this || target, args));
        return result;
      };
    },
  });
}

export function enhanceCustom(prisma: PrismaClient) {
  return createEnhancedProxy(prisma);
}