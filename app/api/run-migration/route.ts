import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/neon';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Simple protection using the database password as the secret
  if (secret !== 'Didwho123456@#') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🚀 Starting Supabase Database Migration from API route...');

    // 1. Create Users Table
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
    await sql`
      CREATE TABLE IF NOT EXISTS resume_chunks (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 4. Create Audit Logs Table
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
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        config_key TEXT UNIQUE NOT NULL,
        config_val JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 13. Create Analytics Events Table
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

    // Clear old data to prevent duplicates
    await sql`TRUNCATE TABLE projects, resume_chunks, users CASCADE`;

    // 14. Create Admin User (Ashmal Ahmed)
    const hashedPassword = bcrypt.hashSync('Didwho123456@#', 10);
    await sql`
      INSERT INTO users (email, password, name, role)
      VALUES ('ashmalahmed54@gmail.com', ${hashedPassword}, 'Ashmal Ahmed', 'super_admin')
    `;

    // 15. Seed Ashmal's Project
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
    const resumePath = path.join(process.cwd(), 'lib/data/resume.txt');
    const resumeText = fs.readFileSync(resumePath, 'utf-8');
    const chunks = resumeText.split('\n\n').filter(c => c.trim().length > 0);

    for (const chunk of chunks) {
      await sql`
        INSERT INTO resume_chunks (content)
        VALUES (${chunk.trim()})
      `;
    }

    console.log('✅ Database migration and seeding completed successfully!');
    return NextResponse.json({ message: 'Migration and seeding completed successfully!' });
  } catch (error: any) {
    console.error('❌ Migration failed:', error);
    return NextResponse.json({ error: error.message || 'Migration failed' }, { status: 500 });
  }
}
