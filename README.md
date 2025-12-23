# Opal Tideforge (Built for Base)

Opal Tideforge is a browser-first Base utility focused on validating network connectivity, inspecting balances, and observing block-level data using Coinbase Wallet SDK and official Base RPC endpoints.

---

## What this project provides

The application offers a minimal, auditable surface for interacting with Base networks in a strictly read-only manner. It is designed for developers who need fast feedback on network state without deploying transactions.

Primary capabilities include:
- Wallet connection and chainId verification  
- ETH balance inspection for any address  
- Live block metadata retrieval  
- Direct Basescan references for verification  

---

## Base network context

This project explicitly targets Base networks and enforces Base-compatible chain identifiers.

Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  

Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

---

## Repository layout

- app.opal-tideforge.ts  
  Frontend script responsible for wallet connection, RPC calls, and UI rendering.

- contracts/  
  Solidity contracts deployed to Base Sepolia for testnet validation:
  - control.sol — minimal contract that defines roles or ownership (owner, admin, etc.)
  - ERC721.sol — simple Solidity contract that implements the ERC-721 (NFT) standard

- package.json  
  Dependency manifest referencing Coinbase SDKs and multiple Base repositories.

- README.md  
  Technical documentation and testnet deployment records.

---

## Tooling and dependencies

This repository integrates tooling from both the Base and Coinbase open-source ecosystems.

Included components:
- Coinbase Wallet SDK for EIP-1193 wallet access  
- OnchainKit for Base-aligned primitives and references  
- viem for efficient, read-only RPC communication  
- Multiple Base and Coinbase GitHub repositories to reflect ecosystem integration  

---

## Usage overview

After installing dependencies and serving the project in a browser:
- Connect a Coinbase Wallet  
- Confirm the active Base network  
- Inspect ETH balances and blocks  
- Follow Basescan links for external verification  

No transactions are signed or broadcast at any stage.

---

## License

MIT License

Copyright (c) 2025 YOUR_NAME

---

## Author

GitHub: https://github.com/cubist-03 

Email: cubist.03.neighs@icloud.com 

My X: https://x.com/miyalikebee 

---

## Testnet Deployment (Base Sepolia)

As part of pre-production validation, one or more contracts may be deployed to the Base Sepolia test network to confirm correct behavior and tooling compatibility.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract control.sol address:  
0xd1f8932bb5bd9f14afa70255654f4d2538fb4a63

Deployment and verification:
- https://sepolia.basescan.org/address/0xd1f8932bb5bd9f14afa70255654f4d2538fb4a63
- https://sepolia.basescan.org/0xd1f8932bb5bd9f14afa70255654f4d2538fb4a63/0#code  

Contract ERC721.sol address:  
0xfc3074283e0bb7b7c2a4416e29492a6371a0643a

Deployment and verification:
- https://sepolia.basescan.org/address/0xfc3074283e0bb7b7c2a4416e29492a6371a0643a
- https://sepolia.basescan.org/0xfc3074283e0bb7b7c2a4416e29492a6371a0643a/0#code  

These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.
