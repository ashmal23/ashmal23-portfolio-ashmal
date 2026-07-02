import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not defined');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function seedMedia() {
  console.log('🚀 Seeding media library with public images...');

  try {
    const publicDir = path.join(process.cwd(), 'public');
    const files = fs.readdirSync(publicDir);

    for (const file of files) {
      if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.svg')) {
        continue;
      }

      const filePath = path.join(publicDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) continue;

      const url = `/${file}`;
      let mimeType = 'image/png';
      if (file.endsWith('.jpg')) mimeType = 'image/jpeg';
      if (file.endsWith('.svg')) mimeType = 'image/svg+xml';

      // Check if exists
      const existing = await sql`
        SELECT id FROM media_library WHERE url = ${url}
      `;

      if (existing.length === 0) {
        console.log(`Inserting ${file}...`);
        await sql`
          INSERT INTO media_library (filename, mime_type, url, size_bytes)
          VALUES (${file}, ${mimeType}, ${url}, ${stat.size})
        `;
      }
    }

    console.log('✅ Media seeding completed successfully!');
  } catch (error) {
    console.error('❌ Media seeding failed:', error);
    process.exit(1);
  }
}

seedMedia();
