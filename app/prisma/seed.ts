// Seeds one fictional test salon for Sprint 1: one specialist, three nail services,
// open 10:00 to 20:00 every day. Safe to run twice. Run: npm run db:seed
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {}
}

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  const owner = await db.user.upsert({
    where: { phone: "+995000000001" },
    update: {},
    create: { phone: "+995000000001", name: "Test salon owner", role: "PROVIDER_OWNER" },
  });

  const nails = await db.category.upsert({
    where: { slug: "nails" },
    update: {},
    create: { slug: "nails", name: { ka: "ფრჩხილები", en: "Nails" } },
  });

  const provider = await db.provider.upsert({
    where: { slug: "test-salon" },
    update: { status: "PUBLISHED" },
    create: {
      slug: "test-salon",
      ownerUserId: owner.id,
      name: "IERI Test Salon",
      type: "SALON",
      address: "Test data, not a real salon",
      district: "Vake",
      status: "PUBLISHED",
      slotIntervalMinutes: 15,
      bookingLeadTimeMinutes: 30,
    },
  });

  let specialist = await db.specialist.findFirst({ where: { providerId: provider.id } });
  specialist ??= await db.specialist.create({ data: { providerId: provider.id, name: "Nail technician" } });

  const services = [
    { en: "Gel manicure", ka: "გელ მანიკური", min: 60, price: 5000, removal: false },
    { en: "Gel removal + gel manicure", ka: "გელის მოხსნა + გელ მანიკური", min: 75, price: 6000, removal: true },
    { en: "Classic manicure", ka: "კლასიკური მანიკური", min: 45, price: 3500, removal: false },
  ];
  for (const s of services) {
    const existing = await db.service.findFirst({ where: { providerId: provider.id, name: { equals: { ka: s.ka, en: s.en } } } });
    const service =
      existing ??
      (await db.service.create({
        data: {
          providerId: provider.id,
          categoryId: nails.id,
          name: { ka: s.ka, en: s.en },
          durationMinutes: s.min,
          price: s.price,
          includesRemoval: s.removal,
        },
      }));
    await db.specialistService.upsert({
      where: { specialistId_serviceId: { specialistId: specialist.id, serviceId: service.id } },
      update: {},
      create: { specialistId: specialist.id, serviceId: service.id },
    });
  }

  await db.workingSchedule.deleteMany({ where: { providerId: provider.id } });
  await db.workingSchedule.createMany({
    data: [0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => ({
      providerId: provider.id,
      dayOfWeek,
      startTime: "10:00",
      endTime: "20:00",
    })),
  });

  console.log("Seeded test-salon");
}

main().finally(() => db.$disconnect());
