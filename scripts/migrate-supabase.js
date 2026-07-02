const postgres = require('postgres');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

// Connect to PostgreSQL database (Supabase)
const sql = postgres(databaseUrl, {
  ssl: 'prefer',
  prepare: false, // Disables prepared statements for transaction poolers (PgBouncer port 6543)
});

async function runMigration() {
  console.log('🚀 Starting Supabase Database Migration and Seeding...');

  try {
    // 1. Create Users Table
    console.log('Creating users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        role TEXT DEFAULT 'client',
        refresh_token TEXT,
        token_expires TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 2. Create Projects Table
    console.log('Creating projects table...');
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        tags TEXT[] NOT NULL,
        gradient TEXT NOT NULL,
        image TEXT NOT NULL,
        live_link TEXT NOT NULL,
        github_link TEXT NOT NULL,
        show_on_homepage BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 3. Create Resume Chunks Table
    console.log('Creating resume_chunks table...');
    await sql`
      CREATE TABLE IF NOT EXISTS resume_chunks (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 4. Create Audit Logs Table
    console.log('Creating audit_logs table...');
    await sql`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        action TEXT NOT NULL,
        target_table TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 5. Create Posts Table (Blog)
    console.log('Creating posts table...');
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT[] NOT NULL DEFAULT '{}',
        banner_image TEXT,
        is_published BOOLEAN DEFAULT FALSE,
        published_at TIMESTAMP WITH TIME ZONE,
        show_on_homepage BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 6. Create Services Table
    console.log('Creating services table...');
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price_range TEXT NOT NULL,
        delivery_time TEXT NOT NULL,
        features TEXT[] NOT NULL DEFAULT '{}',
        is_active BOOLEAN DEFAULT TRUE,
        image_url TEXT,
        show_on_homepage BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 7. Create Contacts Table
    console.log('Creating contacts table...');
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        is_processed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 8. Create Leads Table (CRM)
    console.log('Creating leads table...');
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        contact_id INTEGER REFERENCES contacts(id) ON DELETE CASCADE,
        pipeline_stage TEXT NOT NULL DEFAULT 'New',
        notes TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 9. Create Lead Notes Table
    console.log('Creating lead_notes table...');
    await sql`
      CREATE TABLE IF NOT EXISTS lead_notes (
        id SERIAL PRIMARY KEY,
        lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
        author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 10. Create Media Library Table
    console.log('Creating media_library table...');
    await sql`
      CREATE TABLE IF NOT EXISTS media_library (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        url TEXT NOT NULL,
        size_bytes INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 11. Create Knowledge Base Table
    console.log('Creating knowledge_base table...');
    await sql`
      CREATE TABLE IF NOT EXISTS knowledge_base (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 12. Create Site Settings Table
    console.log('Creating site_settings table...');
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        config_key TEXT UNIQUE NOT NULL,
        config_val JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 13. Create Analytics Events Table
    console.log('Creating analytics_events table...');
    await sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        page_url TEXT NOT NULL,
        session_id TEXT NOT NULL,
        referrer TEXT,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Clear old data
    console.log('Clearing old data from tables...');
    await sql`TRUNCATE TABLE projects, resume_chunks, users CASCADE`;

    // 14. Create Admin User (Ashmal Ahmed)
    console.log('Creating admin user: ashmalahmed54@gmail.com...');
    const hashedPassword = bcrypt.hashSync('ASHMAL2005', 10);
    await sql`
      INSERT INTO users (email, password, name, role)
      VALUES ('ashmalahmed54@gmail.com', ${hashedPassword}, 'Ashmal Ahmed', 'super_admin')
    `;

    // 15. Seed Ashmal's Project
    console.log('Seeding Ashmal\'s project...');
    const project = {
      title: "STUDENT RECORD MANAGEMENT SYSTEM (CONSOLE-BASED)",
      description: "Designed and implemented a menu-driven CLI application in C and Python to manage student data (add, update, delete, search). Features a modular architecture, inputs validation, edge cases handling, and robust program reliability.",
      tags: ["C", "Python", "Data Structures", "CLI", "File I/O"],
      gradient: "from-teal-950 via-emerald-900 to-emerald-950",
      image: "/student-record-system.png",
      live_link: "",
      github_link: "https://github.com/ashmal23",
    };

    await sql`
      INSERT INTO projects (title, description, tags, gradient, image, live_link, github_link)
      VALUES (${project.title}, ${project.description}, ${project.tags}, ${project.gradient}, ${project.image}, ${project.live_link}, ${project.github_link})
    `;

    // 16. Seed Ashmal's Resume chunks
    const resumePath = path.join(__dirname, '../lib/data/resume.txt');
    const resumeText = fs.readFileSync(resumePath, 'utf-8');
    const chunks = resumeText.split('\n\n').filter(c => c.trim().length > 0);

    console.log(`Inserting ${chunks.length} resume chunks for RAG...`);
    for (const chunk of chunks) {
      await sql`
        INSERT INTO resume_chunks (content)
        VALUES (${chunk.trim()})
      `;
    }

    console.log('✅ Supabase database migration and seeding completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runMigration();
