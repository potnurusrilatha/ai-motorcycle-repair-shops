import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  // Check total count
  const total = await prisma.repairShop.count();
  console.log(`Total shops: ${total}`);

  // Check London shops
  const londonShops = await prisma.repairShop.findMany({
    where: {
      OR: [
        { city: { contains: 'London', mode: 'insensitive' } },
        { city: { contains: 'london', mode: 'insensitive' } },
      ]
    },
    take: 5
  });

  console.log(`\nLondon shops found: ${londonShops.length}`);
  if (londonShops.length > 0) {
    console.log('\nFirst few London shops:');
    londonShops.forEach(shop => {
      console.log(`- ${shop.name} in ${shop.city}`);
    });
  }

  // Sample first 5 shops to see what cities we have
  const sampleShops = await prisma.repairShop.findMany({
    take: 10,
    select: { name: true, city: true, state: true }
  });

  console.log('\nSample of cities in database:');
  sampleShops.forEach(shop => {
    console.log(`- ${shop.city}, ${shop.state}`);
  });

  await prisma.$disconnect();
}

checkData();
