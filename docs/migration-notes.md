# Migration notes

## Completed in this step

- Converted repository into a pnpm workspace monorepo layout.
- Moved the existing Next.js app into `apps/web`.
- Added shared package scaffolds (`ui`, `shared`, `config`).
- Added backend app placeholder directory and migration documentation.

## Next steps

- Import Flask backend code into `apps/minecraft-backend`.
- Add Clerk trust model in backend boundary.
- Implement Convex/server action integration for all backend operations.
- Migrate Vite frontend features route-by-route into `apps/web`.
