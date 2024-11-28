import { enhance } from "@zenstackhq/runtime/edge";
import { createEventHandler } from "@zenstackhq/server/nuxt";
import { prisma } from "~/server/prisma";

export default createEventHandler({
  getPrisma: (event) => {
    console.log("Starting getPrisma");
    try {
      console.log("Enhancing prisma...");
      const enhancedPrisma = enhance(prisma, {});
      console.log("Prisma enhanced successfully");
      return enhancedPrisma;
    } catch (error) {
      console.error("Error in getPrisma:", error);
      throw error;
    }
  },
});