# ReineiraOS Examples

Reference examples for [ReineiraOS](https://github.com/ReineiraOS) — productized protocols and reference implementations built on the platform.

Repository: **[github.com/ReineiraOS/examples](https://github.com/ReineiraOS/examples)**

## Categories

| Folder                      | Purpose                                                 |
| --------------------------- | ------------------------------------------------------- |
| [`solutions/`](./solutions) | Full reference implementations and end-to-end solutions |
| [`starter/`](./starter)     | Minimal templates to bootstrap your own example         |

Each example is a self-contained project with its own `package.json` and lockfile.

## Quick start

```bash
# clone
git clone https://github.com/ReineiraOS/examples.git
cd examples

# install root tooling (husky, lint-staged, plop, prettier)
pnpm install

# enter and run any example, e.g.
cd solutions/liquidity-accord
pnpm install
pnpm dev:app
```

## Adding a new example

We use [Plop](https://plopjs.com) to scaffold new examples consistently.

```bash
pnpm new-example
```

You'll be prompted for:

1. **Name** — human-readable (e.g. `My Cool App`)
2. **Description** — one-line summary
3. **Category** — `solutions` or `starter`

The generator copies the canonical Next.js template from `plop-templates/example/` into `<category>/<slug>/` and replaces placeholders.

After scaffolding, fill in the README's YAML frontmatter so the example is properly catalogued. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full spec.

## Featured example

**[Liquidity Accord](./solutions/liquidity-accord)** — confidential performance bonds for market-makers and parametric delisting insurance for token issuers. Built on ReineiraOS (Arbitrum + Fhenix CoFHE) with a Hono + Drizzle + Neon backend and a React 19 + Vite frontend using ZeroDev ERC-4337 smart accounts.

## The pre-commit hook

We use [Husky](https://typicode.github.io/husky/#/) for the pre-commit Git hook. It is configured automatically during `pnpm install`. Code changes go through Prettier on commit. If hooks fail to install, run:

```bash
pnpm run prepare
```

## License

MIT — see [LICENSE](./LICENSE).
