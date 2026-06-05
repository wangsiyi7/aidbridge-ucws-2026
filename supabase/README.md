# AidBridge Supabase Backend

AidBridge stays deployable on GitHub Pages, but it can now sync demo outputs into Supabase through the browser using a Supabase project URL and anon key.

## Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Copy the project URL and anon public key.
5. Open AidBridge, go to `Ops Desk`, and paste the values into `Supabase Backend Sync`.

The browser stores the URL and anon key in `localStorage`. Do not paste a service-role key into the browser.

## Tables

- `aidbridge_action_packs`: one row per generated action pack.
- `aidbridge_ops_desks`: one row per synced multi-case operations snapshot.

## Security Note

The included RLS policies are demo-friendly: they allow anonymous browser users to insert and read rows where `source = 'aidbridge-browser'`. For production, replace them with authenticated-user policies, team IDs, and stricter ownership checks.

## Static Deployment

No server secrets are required for GitHub Pages. The frontend calls Supabase PostgREST with:

- `apikey: <anon key>`
- `Authorization: Bearer <anon key>`

This is the standard public-client pattern for Supabase browser apps when Row Level Security is enabled.
