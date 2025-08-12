**Live App**: [https://balut-dice-game.web.app/game/chart](https://balut-dice-game.web.app/game/chart) 

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## Run rtp-simulation.test.ts

```bash
npx vitest run tests/rtp-simulation.test.ts

```
RTP with odds 5,4,3,2 is approximately 166%

## Run rtp-95.test.ts

```bash
npx vitest run tests/rtp-95.test.ts

```
RTP 95% - odds: 2.8565432, 2.28523456, 1.71392592, 1.14261728,
coefficient: 0.5720782458515294