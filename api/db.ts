import { PrismaClient, Prisma } from "./prisma/client";

const db = new PrismaClient();

export { Prisma, PrismaClient };
export default db;
