# Project Audit & Database Configuration Guide

This document contains the audit details, environment configurations, and steps required to connect your portfolio to the new Neon PostgreSQL database and successfully initialize the tables.

---

## 1. Environment & Database Details

### Active Database Connection (Local Config)
Your local `.env.local` file has been configured to use the following Neon database URL:
```env
DATABASE_URL="postgresql://neondb_owner:npg_kBJY3PCbsNL6@ep-patient-boat-at0j27j6-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

### Vercel Deployment Note
Since `.env.local` is ignored by Git for security, Vercel cannot see this file. To make your live deployed website save and read data from this database, **you must update the Environment Variables in your Vercel Dashboard**.

---

## 2. Step-by-Step Vercel Setup

To update the database URL on Vercel:
1. Open your Vercel Dashboard and click on your portfolio project.
2. Go to the **Settings** tab at the top.
3. Click on **Environment Variables** in the left sidebar.
4. Locate the existing `DATABASE_URL` variable (or create it if it doesn't exist):
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://neondb_owner:npg_kBJY3PCbsNL6@ep-patient-boat-at0j27j6-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
5. Click **Save** or **Add**.
6. **Redeploy the site** to apply the new environment variable (Go to the **Deployments** tab, click the three dots on the latest deployment, and select **Redeploy**).

---

## 3. How to Run Database Migrations

Once your Vercel site is redeployed with the new `DATABASE_URL`, you need to create the database tables and seed them. We created a dynamic migration API endpoint for this:

1. Open your web browser and navigate to:
   ```
   https://[YOUR-VERCEL-DOMAIN].vercel.app/api/run-migration?secret=Didwho123456@#
   ```
   *(Replace `[YOUR-VERCEL-DOMAIN]` with your actual Vercel URL, e.g., `ashmal23-portfolio-ashmal.vercel.app`)*

2. This will instantly:
   - Connect to your Neon database.
   - Create all tables: `users`, `projects`, `posts`, `resume_chunks`, `services`, `contacts`, `leads`, `lead_notes`, `media_library`, `knowledge_base`, `site_settings`, `analytics_events`, `audit_logs`.
   - Seed your Super Admin user:
     - **Email**: `ashmalahmed54@gmail.com`
     - **Password**: `ASHMAL2005`
   - Seed your projects list and chatbot resume chunks.

3. You will see this message in your browser once complete:
   ```json
   { "message": "Migration and seeding completed successfully!" }
   ```

---

## 4. Troubleshooting Checklist

- [ ] **Database Connection Error (500)**: Make sure the `DATABASE_URL` in Vercel does not contain typos and the trailing parameters (`?sslmode=require`) are correct.
- [ ] **Admin Login Not Working**: Make sure you have run the `/api/run-migration?secret=Didwho123456@#` page in your browser. Without running the migration, the `users` table is empty and you cannot log in.
- [ ] **Admin Credentials**:
  - Email: `ashmalahmed54@gmail.com`
  - Password: `ASHMAL2005`
