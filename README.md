# Escrow Frontend

Next.js frontend for the Soroban milestone escrow smart contract on Stellar.

## Live Contract

| Network | Contract ID |
|---|---|
| Testnet | `CBBRYWY6ROXCM6AHP4COM3AL6UDPTY66FXF43Q7PNEIPU53RZOGHBYP3` |

## Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS
- Stellar SDK
- Freighter Wallet

## Pages

- `/` — Landing page
- `/create` — Create a new escrow job with milestones
- `/dashboard` — View job status and interact with milestones

## Setup

```bash
npm install
cp .env.local.example .env.local  # add your contract ID
npm run dev
```

## Environment Variables

NEXT_PUBLIC_CONTRACT_ID=CBBRYWY6ROXCM6AHP4COM3AL6UDPTY66FXF43Q7PNEIPU53RZOGHBYP3

## Related Repos

- `https://github.com/Goldii-locks/escrow-contract`  — Soroban smart contract
- Update README with latest progress
