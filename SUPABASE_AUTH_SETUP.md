# PhotoKB — Supabase Auth setup

This repository uses a React + Vite single-page app and Supabase Auth with email/password.

## What is included

- Email/password sign-up and sign-in.
- Email confirmation redirect to /dashboard.
- Forgot-password email and /reset-password flow.
- Session persistence and automatic token refresh through Supabase JS.
- A protected /dashboard route.
- A user-owned profiles row created by a database trigger.
- Profile read/write protected by Postgres Row Level Security.
- No image, signature, compression-job, or image-history storage.

## Supabase project

Project URL:
https://wrzsytszgooxublwdwwm.supabase.co

Use the project's **publishable key** in the frontend. Never use the service_role or a secret key in Vite variables or browser code.

## Environment variables

Set these variables in the local .env.local file and in Cloudflare Pages → Settings → Environment variables:

- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY

The repository's .env.example contains placeholders only. The values are intentionally not committed.

## Auth URL configuration

In Supabase Dashboard → Authentication → URL Configuration:

1. Set **Site URL** to the production website origin.
2. Add the production URL and local development callback to **Redirect URLs**.
3. Add the Cloudflare Pages preview URL pattern if preview deployments will be used.

The app sends email confirmation links back to /dashboard and password recovery links back to /reset-password. The callback URLs must be allowed by the project Auth URL configuration.

Keep email confirmation enabled for production. A user who has not confirmed their email will be shown a message to check their inbox before signing in.

## Database

The two SQL migrations in supabase/migrations/ have been applied to the linked Supabase project:

- 20261113093809_create_user_profiles_with_rls.sql
- 20261113094259_add_profile_creation_and_updated_at_triggers.sql

The profiles table is keyed to auth.users.id. RLS policies allow each authenticated account to select, insert, and update only its own row. Anonymous access is revoked.

## Local development

After adding the two environment variables:

~~~bash
npm install
npm run dev
~~~

The Vite app uses the /login, /signup, /forgot-password, /reset-password, and /dashboard paths. Keep the Cloudflare Pages SPA fallback enabled so direct visits and refreshes on these paths serve index.html.

## Security notes

- The browser only receives the publishable key.
- Authorization is enforced by Postgres RLS, not by hiding UI routes.
- The dashboard is a user account page, not an admin panel.
- Do not put admin roles in user-editable metadata.
- Photos and signatures continue to be processed locally in the browser.
