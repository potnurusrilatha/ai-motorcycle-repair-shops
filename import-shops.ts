import * as fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function importShops() {
  const shops: any[] = [];

  // Find the CSV file (looking for any .csv file)
  const files = fs.readdirSync('.');
  const csvFile = files.find(f => f.endsWith('.csv'));

  if (!csvFile) {
    console.error('❌ No CSV file found in project directory');
    return;
  }

  console.log(`📁 Reading from: ${csvFile}`);

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on('data', (row) => {
      // Extract zip code from address (e.g., "75015 Paris" -> "75015")
      const zipCodeMatch = row.address?.match(/\b\d{5}\b/);
      const zipCode = zipCodeMatch ? zipCodeMatch[0] : '';

      // Extract city name from "City, Country" format
      const cityParts = row.city?.split(',');
      const city = cityParts ? cityParts[0].trim() : '';
      const state = cityParts && cityParts.length > 1 ? cityParts[1].trim() : '';

      shops.push({
        name: row.name || 'Unknown',
        address: row.address || '',
        city: city || '',
        state: state || 'France',
        zipCode: zipCode,
        phone: row.phone || '',
        email: null, // Not in CSV
        description: `${row.business_type || 'Motorcycle repair shop'}. ${row.reviews_count || '0'} reviews.`,
        rating: row.rating ? parseFloat(row.rating) : null,
        specialty: row.business_type || 'Motorcycle repair shop'
      });
    })
    .on('end', async () => {
      console.log(`📊 Processing ${shops.length} shops...`);

      let imported = 0;
      for (const shop of shops) {
        try {
          await prisma.repairShop.create({ data: shop });
          imported++;
        } catch (error) {
          console.error(`Failed to import ${shop.name}:`, error);
        }
      }

      console.log(`✅ Successfully imported ${imported} out of ${shops.length} shops!`);
      await prisma.$disconnect();
      process.exit(0);
    })
    .on('error', (error) => {
      console.error('❌ Error reading CSV:', error);
      process.exit(1);
    });
}

importShops().catch((error) => {
  console.error('❌ Import failed:', error);
  process.exit(1);
});
