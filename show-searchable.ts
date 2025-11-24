import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function showSearchableData() {
  console.log('=== SEARCHABLE DATA IN YOUR DATABASE ===\n');

  // Get unique cities
  const shops = await prisma.repairShop.findMany({
    select: { city: true, name: true, state: true },
    take: 100
  });

  // Extract unique cities
  const cities = [...new Set(shops.map(s => s.city))];
  console.log(`Unique Cities (first 20):`);
  cities.slice(0, 20).forEach(city => console.log(`  - ${city}`));

  // Show some shop names
  console.log(`\nShop Names (first 20):`);
  shops.slice(0, 20).forEach(shop => {
    console.log(`  - ${shop.name} (${shop.city})`);
  });

  await prisma.$disconnect();
}

showSearchableData();
