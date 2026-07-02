import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  const filePath = path.join(process.cwd(), 'public', 'window.svg'); // small
  const filePathBig = path.join(process.cwd(), 'public', 'tiktok-web-downloader.png'); // big (1.3MB)

  const bigBuf = fs.readFileSync(filePathBig);
  const base64Data = bigBuf.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Data}`;

  console.log('Data URL length:', dataUrl.length);

  try {
    console.log('Inserting big file...');
    const result = await sql`
      INSERT INTO media_library (filename, mime_type, url, size_bytes)
      VALUES ('test_big.png', 'image/png', ${dataUrl}, ${bigBuf.length})
      RETURNING id
    `;
    console.log('Success:', result);
  } catch (e) {
    console.error('Insert failed:', e);
  }
}

run();
