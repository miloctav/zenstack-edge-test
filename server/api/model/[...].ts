import { createEventHandler } from "@zenstackhq/server/nuxt";
import { getPrisma } from '../../prisma';

export default createEventHandler({
  getPrisma: async () => {
    console.log("Getting Prisma instance...");
    return getPrisma();
  },
});