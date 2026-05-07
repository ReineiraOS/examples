# Contributing

Thanks for adding a new example to ReineiraOS Examples. This document covers conventions and the metadata spec used for cataloguing.

## Workflow

1. Fork and clone the repo.
2. Run `pnpm install` at the root (sets up husky + lint-staged).
3. Run `pnpm new-example` to scaffold a new example.
4. Fill in the README frontmatter (see below).
5. Implement your example, ensure it builds and tests pass.
6. Open a PR.

## Required structure

Every example must include:

- `README.md` with YAML frontmatter (see spec below)
- `package.json` with at minimum a `name` and standard scripts (`dev`, `build`, `test` where applicable). License `MIT`.
- `.gitignore`
- A working build / test command documented in the README
- `.env.example` if the example requires environment variables

If you use Next.js, follow the conventions in [`plop-templates/example/`](./plop-templates/example).

## Frontmatter spec

Each example's `README.md` starts with YAML frontmatter:

```yaml
---
title: Liquidity Accord            # required, human-readable
slug: liquidity-accord             # required, kebab-case (matches directory name)
description: One-line summary…     # required
framework: monorepo                # required: nextjs | hono | hardhat | foundry | monorepo | other
type: defi-protocol                # required: dapp | api | sdk | defi-protocol | solidity-contracts | other
tags: [defi, fhe, arbitrum]        # required, lowercase array
demoUrl: null                      # optional, live demo URL
image: null                        # optional, og:image path relative to example
author: NextGen Financial Analytics  # optional
dateAdded: 2026-05-07              # optional, ISO date
repoPath: solutions/liquidity-accord  # required, path from repo root
---
```

## Categories

| Category     | When to use                                                          |
| ------------ | -------------------------------------------------------------------- |
| `solutions/` | A complete, end-to-end reference (protocols, dApps, full-stack apps) |
| `starter/`   | A minimal template meant for cloning                                 |

## Code style

- Pre-commit runs `prettier` via `lint-staged` automatically.
- Prefer TypeScript for JavaScript code.
- Solidity: pragma `^0.8.24` or newer.
- Examples may carry their own `pnpm-workspace.yaml` if internally split into packages — root has no workspace, so every example stays self-contained.

## License

By contributing you agree your code is MIT-licensed under [LICENSE](./LICENSE).
