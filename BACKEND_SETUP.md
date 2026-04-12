# Backend Setup

## What Is Implemented

The app now expects:

- Supabase Auth for signup, login, logout, and session cookies
- Supabase Postgres for profiles, member progress, interest submissions, and forum posts
- Supabase Storage bucket named `member-uploads` for assignment files

## Required Environment Variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Supabase SQL

Run:

- [schema.sql](C:\Users\renem\Downloads\A-New-Path-Community\supabase\schema.sql)

in the Supabase SQL editor.

If the app is already set up and you only need to add forum replies later, also run:

- [forum-replies.sql](C:\Users\renem\Downloads\A-New-Path-Community\supabase\forum-replies.sql)

## Storage Bucket

Create a storage bucket named:

- `member-uploads`

Recommended setting:

- private bucket

The current server routes upload with the service role key, so the bucket does not need public access.

## Auth Setting

Recommended for the current flow:

- disable email confirmation while testing

If email confirmation stays enabled, signup still creates the account, but the member must confirm the email before logging in.

## Current Backend Shape

- `/api/auth/signup`
- `/api/auth/login`
- `/api/auth/logout`
- `/api/interest`
- `/api/member`
- `/api/member/forum`
- `/api/member/uploads`

## What Is Still Next

- Stripe-backed donation/support flow
- stronger moderation/reporting model
- splitting forum threads and replies into richer relational tables
- replacing the single JSON progress document with more granular assignment tables if needed
