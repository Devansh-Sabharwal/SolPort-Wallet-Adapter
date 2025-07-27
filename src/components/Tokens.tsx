import { getAllTokensForWallet } from "@/token-utility/fetchToken";
import { useWallet } from "@solana/wallet-adapter-react";
import { RefreshCcw, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { SplTransaction } from "./SplTransaction";
import { PublicKey } from "@solana/web3.js";
export default function Tokens() {
  const wallet = useWallet();
  const [transactionForm, setTransactionForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currBalance, setCurrBalance] = useState<number>(0);
  const [mint, setMint] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>("");
  const [tokens, setTokens] = useState<
    Array<{
      mint: any;
      balance: any;
      decimals: any;
      programType: string;
      name: string;
      symbol: string;
      image: string | undefined;
    }>
  >([]);

  useEffect(() => {
    const fetchTokens = async () => {
      if (wallet.publicKey) {
        setLoading(true);
        await getAllTokensForWallet(wallet.publicKey).then(setTokens);
        setLoading(false);
      } else {
        setTokens([]);
      }
    };
    fetchTokens();
  }, [wallet.publicKey, refresh]);

  if (!wallet.publicKey) return <></>;
  return (
    <div>
      <span onClick={() => setRefresh(!refresh)} title="refresh balance">
        <RefreshCcw className="h-4 w-4 cursor-pointer hover:rotate-180 transition-all duration-500 -translate-y-16 translate-x-24" />
      </span>
      {transactionForm && (
        <SplTransaction
          isOpen={transactionForm}
          onClose={() => setTransactionForm(false)}
          senderPublicKey={wallet.publicKey!}
          balance={currBalance}
          setRefresh={setRefresh}
          mintAddress={new PublicKey(mint)}
          type={type}
        />
      )}
      <div className="w-full flex justify-center">
        {" "}
        {loading && <span className="loader mb-4"></span>}
      </div>
      <div className="flex flex-col gap-2 animate-fade-in">
        {tokens.map((e, idx) => (
          <div
            key={idx}
            onClick={() => {
              setTransactionForm(true);
              setCurrBalance(e.balance);
              setMint(e.mint);
              setType(e.programType);
            }}
            className="bg-accent rounded-md px-2 sm:px-4 py-2 "
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div>
                  <img
                    className="rounded-full w-12"
                    onError={(e) => {
                      e.currentTarget.src = "/vite.svg";
                    }}
                    src={e.image}
                  />
                </div>
                <div>
                  <div className="font-geist text-lg font-semibold">
                    {e.name}
                  </div>
                  <div className="font-geist dark:text-gray-300/70">
                    {e.balance} {e.symbol}
                  </div>
                </div>
              </div>
              <div className="mr-2 cursor-pointer">
                <Send className="hover:scale-110 transition-all duration-300" />
              </div>
            </div>
          </div>
        ))}
        {tokens.length === 0 && !loading && (
          <div className="w-full text-center">
            No SPL tokens are associated with this account.
          </div>
        )}
      </div>
    </div>
  );
}
