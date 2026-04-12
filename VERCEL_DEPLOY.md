# Vercel Deployment

## Before You Start

This project is ready for Vercel, but you still need:

- a GitHub repository for this folder
- the existing Supabase project
- the existing Supabase environment values

## 1. Create A GitHub Repository

Inside `C:\Users\renem\Downloads\A-New-Path-Community`:

1. initialize git
2. create the first commit
3. create a new empty GitHub repo
4. connect this folder to that repo
5. push `main`

Suggested commands:

```powershell
git init
git add .
git commit -m "Initial A New Path Community app"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## 2. Create The Vercel Project

In Vercel:

1. click `Add New...`
2. click `Project`
3. import the GitHub repository
4. keep the detected framework as `Next.js`
5. do not change the build command unless Vercel asks

## 3. Add Environment Variables In Vercel

Add these variables from your local `.env.local`:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Important:

- for production, `NEXT_PUBLIC_APP_URL` should be your real Vercel URL
- after you add your custom domain later, update `NEXT_PUBLIC_APP_URL` again to that domain

## 4. Production Value For NEXT_PUBLIC_APP_URL

Use one of these:

- first deploy: `https://YOUR-PROJECT.vercel.app`
- later: `https://YOURDOMAIN.com`

Do not leave it as `http://localhost:3000` in Vercel.

## 5. Deploy

After the environment variables are saved:

1. click `Deploy`
2. wait for the build to finish
3. open the production URL

## 6. Test After Deploy

Test these in production:

1. homepage loads with styling
2. signup works
3. login works
4. `/member` opens after login
5. step draft saving works
6. reflection answer saving works
7. uploads work
8. forum posting works
9. forum replies work

## 7. Important Supabase Note

If forum replies were added after the first Supabase setup, make sure you already ran:

- [forum-replies.sql](C:\Users\renem\Downloads\A-New-Path-Community\supabase\forum-replies.sql)

## 8. Recommended Local Preview

If `next dev` becomes unstable on Windows, use:

```powershell
npm run build
npm run start
```

That is often more stable than hot reload for this project.
