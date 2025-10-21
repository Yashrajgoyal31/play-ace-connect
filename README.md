# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a8af4a11-6eaf-4501-bf04-65c95435c055

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a8af4a11-6eaf-4501-bf04-65c95435c055) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Points System (Supabase)

A production-ready points and leaderboard schema is included.

1. Run migrations: see `supabase/migrations/20251020000000_points_system.sql`.
2. A trigger enqueues `matches` when status becomes `completed` into `match_event_queue`.
3. A background worker (Edge Function/cron) should:
   - Compute ELO per sport and update `sport_ratings`
   - Award points to winners based on tournament weight and opponent strength
   - Write `points_ledger` entries and increment `player_stats`
4. Frontend:
   - `src/hooks/use-player-points.ts` fetches player totals
   - `src/components/leaderboard/leaderboard-screen.tsx` reads `leaderboard_view`

Only tournament matches should contribute points; casual matches must be ignored or weighted 0 in the worker.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a8af4a11-6eaf-4501-bf04-65c95435c055) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
