import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

import MainDapp from "./MainDapp";
const rpcUrl = import.meta.env.VITE_RPC_URL;

export default function WalletAdapter() {
  return (
    <ConnectionProvider
      endpoint={`${rpcUrl}`}
      // endpoint="https://api.devnet.solana.com"
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <MainDapp />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
