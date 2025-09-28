# Knob
<img src="https://github.com/user-attachments/assets/0d7706d2-68dd-4570-a626-296272c25b73" alt="logo" height=100>

Knob is a Web3 aggregator that streamlines access to swaps, liquidity pools, and cross-chain bridges. Designed for users of all levels, it categorizes opportunities by user intent and offers intelligent recommendations through a premium personalized engine.

Visit the live site [here](https://knob-psi.vercel.app/)

---
<!--
## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Directory Structure](#directory-structure)
* [Startup Guide](#startup-guide)
* [Development](#development)
* [Deployments](#deployments)
* [Smart Contracts](#smart-contracts)
* [Contributing](#contributing)

---
-->

## Features

* Swap tokens across multiple protocols
* Provide/withdraw liquidity in various pools
* Cross-chain bridging
* Intent-based categorization (e.g. “I want to swap”, “I want yield”, etc.)
* Personalized recommendation engine

---

## Tech Stack

* Frontend: **Next.js**, **TypeScript**
* Smart Contracts: **Solidity**
* Blockchains: Ethereum, Flow, Filecoin

---

## Directory Structure

```
Knob/
├── SynapseSetup/      # setup scripts or configuration for Synapse (bridge / protocol)
├── app/               # Next.js app pages / routes
├── components/        # UI components
├── hooks/             # React hooks
├── lib/               # utility libraries, helpers
├── public/            # static assets
├── smart-contracts/   # Solidity contracts
├── styles/            # CSS / styling
├── .gitignore
├── bun.lock
├── components.json
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
└── tsconfig.json
```

---

## Startup Guide

These steps will help you run the project locally.

### Prerequisites

* Node.js (>= v14 or compatible)
* Yarn / npm / bun (depending on preferred package manager)
* Access to required RPC endpoints (Ethereum, Flow, Filecoin, etc.)
* Environment variables (API keys, private keys, etc.)

### Installation

```bash
# Clone the repo
git clone https://github.com/prithwish122/Knob.git
cd Knob

# Install dependencies
# (choose one)
npm install
# or
yarn
# or
bun install
```

### Environment Setup

Create a `.env.local` (or `.env`) file at the root. You will need to supply:

* RPC URLs / provider endpoints for the blockchains used
* Private key or wallet key (if contract interactions are needed)
* Any API keys used for aggregation / data fetching

Example `.env.local`:

```
NEXT_PUBLIC_ETH_RPC_URL="https://mainnet.infura.io/v3/…"
NEXT_PUBLIC_FLOW_RPC_URL="…"
NEXT_PUBLIC_FILECOIN_RPC_URL="…"
PRIVATE_KEY="your_private_key"
…other secrets…
```

Be sure **not** to commit secrets to version control.

### Running Locally

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

This should start the Next.js development server, usually at `http://localhost:3000`.

---

## Development

* Structure UI into reusable components
* Use React hooks for state, data fetching, etc.
* Interact with Ethereum / Flow / Filecoin via suitable libraries (ethers.js, web3.js, etc.)
* Smart contracts in `smart-contracts/` should be compiled, deployed, and then referenced in frontend via their ABI & addresses
* Tests (if any) should be placed near the contracts or in a `tests/` directory

---

## Deployments

You can create a production build and deploy:

```bash
npm run build
npm run start
```

Or use Vercel / Netlify / other services by connecting the GitHub repo.

---

## Smart Contracts

In `smart-contracts/`, you’ll find Solidity files implementing the bridging, swapping, or liquidity logic.

* Before deploying, ensure:

  * contracts compile without errors
  * you set correct chain configurations
  * addresses of tokens, bridges, etc. are correctly configured

* Always test on testnets before deploying to mainnet

---



## Contributing

Contributions are welcome! Here’s how you can help:

* Fork the repo
* Create a feature branch (`git checkout -b feature/YourFeature`)
* Commit your changes (`git commit -m "Add some feature"`)
* Push to the branch (`git push origin feature/YourFeature`)
* Open a pull request

Please ensure:

* Code is well formatted
* New features / changes have tests (if applicable)
* README and documentation are updated

---



