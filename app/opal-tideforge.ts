// app.opal-tideforge.ts
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { createPublicClient, http, formatEther, isAddress } from "viem";
import { base, baseSepolia } from "viem/chains";

type Net = {
  chain: typeof base;
  chainId: number;
  rpc: string;
  explorer: string;
  label: string;
};

const NETWORKS: Net[] = [
  {
    chain: baseSepolia,
    chainId: 84532,
    rpc: "https://sepolia.base.org",
    explorer: "https://sepolia.basescan.org",
    label: "Base Sepolia",
  },
  {
    chain: base,
    chainId: 8453,
    rpc: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    label: "Base Mainnet",
  },
];

let active = NETWORKS[0];

const sdk = new CoinbaseWalletSDK({
  appName: "Opal Tideforge (Built for Base)",
  appLogoUrl: "https://base.org/favicon.ico",
});

const out = document.createElement("pre");
out.style.background = "#0b0f1a";
out.style.color = "#dbe7ff";
out.style.padding = "14px";
out.style.borderRadius = "12px";
out.style.minHeight = "320px";

function log(lines: string[]) {
  out.textContent = lines.join("\n");
}

function client() {
  return createPublicClient({
    chain: active.chain,
    transport: http(active.rpc),
  });
}

async function connectWallet() {
  const provider = sdk.makeWeb3Provider(active.rpc, active.chainId);
  const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
  const address = accounts?.[0];
  if (!address) throw new Error("No address returned from wallet");

  const chainHex = (await provider.request({ method: "eth_chainId" })) as string;
  const balance = await client().getBalance({ address: address as `0x${string}` });

  log([
    "Session established",
    `Network: ${active.label}`,
    `chainId: ${parseInt(chainHex, 16)}`,
    `Wallet: ${address}`,
    `ETH balance: ${formatEther(balance)} ETH`,
    `Explorer: ${active.explorer}/address/${address}`,
  ]);
}

async function readLatestBlock() {
  const b = await client().getBlock();
  log([
    "Block snapshot",
    `Network: ${active.label}`,
    `Block number: ${b.number}`,
    `Timestamp: ${b.timestamp}`,
    `Gas used: ${b.gasUsed}`,
    `Explorer: ${active.explorer}/block/${b.number}`,
  ]);
}

async function readBalance(addr: string) {
  if (!isAddress(addr)) throw new Error("Invalid address");
  const bal = await client().getBalance({ address: addr as `0x${string}` });
  log([
    "Balance lookup",
    `Network: ${active.label}`,
    `Address: ${addr}`,
    `ETH balance: ${formatEther(bal)} ETH`,
    `Explorer: ${active.explorer}/address/${addr}`,
  ]);
}

function toggleNetwork() {
  active = active.chainId === 84532 ? NETWORKS[1] : NETWORKS[0];
  log([`Network switched to ${active.label}. Reconnect wallet to refresh.`]);
}

function mount() {
  const root = document.createElement("div");
  root.style.maxWidth = "1000px";
  root.style.margin = "24px auto";
  root.style.fontFamily = "system-ui";

  const h1 = document.createElement("h1");
  h1.textContent = "Opal Tideforge";

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.flexWrap = "wrap";
  controls.style.gap = "10px";
  controls.style.marginBottom = "12px";

  const btnConnect = document.createElement("button");
  btnConnect.textContent = "Connect Wallet";
  btnConnect.onclick = () => connectWallet().catch(e => log([String(e)]));

  const btnBlock = document.createElement("button");
  btnBlock.textContent = "Latest Block";
  btnBlock.onclick = () => readLatestBlock().catch(e => log([String(e)]));

  const btnToggle = document.createElement("button");
  btnToggle.textContent = "Toggle Network";
  btnToggle.onclick = toggleNetwork;

  const input = document.createElement("input");
  input.placeholder = "0x… address";
  input.style.minWidth = "360px";
  input.style.padding = "8px 10px";

  const btnAddr = document.createElement("button");
  btnAddr.textContent = "Read Balance";
  btnAddr.onclick = () => readBalance(input.value).catch(e => log([String(e)]));

  controls.append(btnConnect, btnBlock, btnToggle);
  root.append(h1, controls, input, btnAddr, out);
  document.body.appendChild(root);

  log(["Ready", `Active network: ${active.label}`, "Connect wallet to begin (read-only)."]);
}

mount();
