# Monorepo architecture

## Apps

- `apps/web`: Next.js + Clerk + Convex frontend
- `apps/minecraft-backend`: Flask + Socket.IO control-plane backend

## Packages

- `packages/ui`: shared shadcn/ui components
- `packages/shared`: shared contracts and DTOs between web and backend boundary
- `packages/config`: shared linting/formatting/typescript config

## Integration rule

The browser should call Convex/Next server actions only. Convex/server actions call Flask REST for Minecraft operations.
