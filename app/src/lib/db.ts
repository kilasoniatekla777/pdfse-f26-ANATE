import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// One client per server instance. Prisma 7 takes the connection through a driver
// adapter, as in IERI's API.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// DATABASE_URL may end in ?schema=<name> so the app's tables live in their own Postgres
// schema; pg does not understand that parameter, so it is passed to the adapter instead.
export function pgAdapter(raw = process.env.DATABASE_URL ?? "") {
  if (!raw) return new PrismaPg({ connectionString: raw });
  const url = new URL(raw);
  const schema = url.searchParams.get("schema") ?? undefined;
  url.searchParams.delete("schema");
  return new PrismaPg({ connectionString: url.toString() }, { schema });
}

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter: pgAdapter() });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
