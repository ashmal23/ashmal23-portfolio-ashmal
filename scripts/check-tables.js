const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const url = process.env.DATABASE_URL;
  console.log('Connecting to database:', url.split('@')[1]); // safe logging
  const sql = postgres(url, { ssl: 'prefer', prepare: false });
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Existing tables in public schema:');
    console.log(tables.map(t => t.table_name));
  } catch (err) {
    console.error('Error fetching tables:', err);
  } finally {
    await sql.end();
  }
}

run();
