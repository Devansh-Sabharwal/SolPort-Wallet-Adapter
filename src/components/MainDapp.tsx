import WalletBalance from "./Wallet-Balance";
import { SignMessage } from "./SignMessage";
import { useWallet } from "@solana/wallet-adapter-react";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
export default function MainDapp() {
  const wallet = useWallet();
  if (!wallet.publicKey) {
    return (
      <>
        <LandingPage />
      </>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="px-4 sm:px-16">
        <WalletBalance />
        <SignMessage />
      </div>
    </div>
  );
}
