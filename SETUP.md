# Setup Guide

## Supabase Configuration

This project requires Supabase environment variables to function properly. Follow these steps:

### 1. Create a `.env.local` file

Create a `.env.local` file in the root of this project with the following content:

```env
# Supabase Configuration
# Get these values from your Supabase project dashboard:
# https://supabase.com/dashboard/project/_/settings/api

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 2. Get your Supabase credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Replace the placeholder values

Replace `your_supabase_project_url_here`, `your_supabase_anon_key_here`, and `your_supabase_service_role_key_here` with your actual Supabase credentials.

### 4. Restart the development server

After creating the `.env.local` file, restart your development server:

```bash
npm run dev
```

Your application should now work without the Supabase configuration error! 