import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import AirDrop from "./AirDrop";
import { RefreshCcw } from "lucide-react";
import SendTokens from "./Transaction";
import { useIsAuthenticationStore } from "@/store/authenticated";
import { useSolanaBalance } from "@/store/balance";

export default function WalletBalance() {
  // const [balance, setBalance] = useState<number>(0);
  const balance = useSolanaBalance((state) => state.balance);
  const setBalance = useSolanaBalance((state) => state.setBalance);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const authenticated = useIsAuthenticationStore(
    (state) => state.authenticated
  );
  const wallet = useWallet();

  const getBalance = async () => {
    if (wallet.publicKey) {
      setLoading(true);
      const balance = await connection.getBalance(wallet.publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (wallet.publicKey) {
      getBalance();
    }
  }, [wallet.publicKey, refresh]);
  if (!wallet.publicKey) {
    return <div>Connect</div>;
  }
  return (
    <div className="mt-12 animate-fade-in">
      <div className="tracking-tighter rounded-lg border-2 pb-6 px-6 sm:px-8 py-6 bg-white dark:bg-black">
        <div className=" justify-center mt-2 mb-6">
          <img
            src="/solanaLightLogo.svg"
            className="h-6 block dark:hidden"
            alt="Solana Logo Light"
          />

          <img
            src="/solanaLogo.svg"
            className="h-6 hidden dark:block"
            alt="Solana Logo Dark"
          />
        </div>
        <div>
          <div>
            <div className="flex gap-4 items-center">
              <div className="text-2xl font-semibold">Balance</div>
              <span
                onClick={() => setRefresh(!refresh)}
                title="refresh balance"
              >
                <RefreshCcw className="h-4 w-4 cursor-pointer hover:rotate-180 transition-all duration-500" />
              </span>
            </div>
            <div className="text-5xl sm:text-7xl font-semibold">
              {loading ? (
                <span className="loader"></span>
              ) : (
                <span>
                  {balance.toString().substring(0, 8)}{" "}
                  <span className="tracking-tighter"> SOL</span>
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-16 mt-8 items-center">
            {authenticated && (
              <div className="mt-4 w-full sm:w-fit">
                <SendTokens setRefresh={setRefresh} />
              </div>
            )}
            <div className="mt-4">
              <AirDrop setRefresh={setRefresh} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
