import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import type { FC } from "react";
import { useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Tokens from "./Tokens";
import { useIsAuthenticationStore } from "@/store/authenticated";

export const SignMessage: FC = () => {
  const { publicKey, signMessage } = useWallet();
  const authenticated = useIsAuthenticationStore(
    (state) => state.authenticated
  );
  const setAuthenticated = useIsAuthenticationStore(
    (state) => state.setAuthenticated
  );
  const onClick = useCallback(async () => {
    try {
      if (!publicKey) {
        toast("Wallet not connected!");
        return;
      }
      if (!signMessage) {
        toast("Wallet does not support message signing!");
        return;
      }

      const message = new TextEncoder().encode(
        `${
          window.location.host
        } wants you to sign in with your Solana account:\n${publicKey.toBase58()}\n\nPlease sign in.`
      );
      const signature = await signMessage(message);

      if (!ed25519.verify(signature, message, publicKey.toBytes())) {
        toast("Message signature invalid!");
        return;
      }
      toast(`success: Message signature: ${bs58.encode(signature)}`);
      setAuthenticated(true);
    } catch (error: any) {
      toast(`error: Sign Message failed: ${error?.message}`);
    }
  }, [publicKey, signMessage]);
  useEffect(() => {
    setAuthenticated(false);
  }, [publicKey]);
  if (authenticated) {
    return (
      <div className="animate-fade-in mt-6 tracking-tighter rounded-lg border-2 bg-white dark:bg-black">
        <div className="text-3xl border-b font-semibold px-6 sm:px-8 py-3 ">
          Tokens
        </div>
        <div className="px-6 sm:px-8 py-6">
          <Tokens />
        </div>
      </div>
    );
  }
  return (
    <div className="animate-fade-in min-h-[200px] mt-6 flex justify-center items-center rounded-xl border bg-white dark:bg-black shadow-sm transition-all px-6 sm:px-10 py-10">
      <div className="flex flex-col justify-center items-center text-center space-y-5">
        <h2 className="font-geist text-2xl sm:text-3xl font-medium tracking-tight text-gray-800 dark:text-gray-100">
          You must authenticate to send tokens
        </h2>

        <Button
          className="w-48 hover:scale-105 cursor-pointer transition-all hover:bg-foreground/80 sm:w-56 mt-2 font-medium px-4 py-2 rounded-md duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onClick}
          disabled={!publicKey || !signMessage}
          size="lg"
        >
          Authenticate
        </Button>
      </div>
    </div>
  );
};
