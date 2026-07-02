import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const sql = neon(process.env.DATABASE_URL!);

async function check() {
  const rows = await sql`SELECT id, filename, mime_type, length(url) as url_len, size_bytes FROM media_library ORDER BY id DESC LIMIT 5`;
  console.log(rows);
}
check();
