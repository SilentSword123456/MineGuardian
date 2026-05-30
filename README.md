# MineGuardian Monorepo

## Structure

- `apps/web` — Next.js + Clerk + Convex frontend
- `apps/minecraft-backend` — Flask + Socket.IO backend (migration target)
- `packages/ui` — shared UI components
- `packages/shared` — shared contracts/types
- `packages/config` — shared configuration packages
- `docs` — architecture and migration notes
- `scripts` — repo-level development helpers

## Development

```bash
pnpm install --config.minimumReleaseAge=0
pnpm approve-builds --all
pnpm dev:web
```

Run both apps:

```bash
pnpm dev:all
```

Validate required env variables:

```bash
pnpm env:check
```
