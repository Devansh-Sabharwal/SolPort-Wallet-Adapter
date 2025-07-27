import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function ConnectWallet() {
  return (
    <div>
      <ConnectWalletButton size="md" />
    </div>
  );
}

const CustomDisconnectButton = () => {
  const { disconnect } = useWallet();

  return (
    <button
      onClick={disconnect}
      className="dark:bg-red-900 bg-red-500 text-destructive-foreground hover:bg-destructive/90 text-white px-4 py-2.5 rounded-md transition-all duration-500 font-medium font-inter text-xs sm:text-sm h-fit hover:scale-105"
    >
      Disconnect
    </button>
  );
};

export const ConnectWalletButton = ({ size }: { size: "sm" | "md" | "lg" }) => {
  const { publicKey } = useWallet();

  const sizeStyles = {
    sm: {
      fontSize: "12px",
      padding: "0px 12px",
      height: "30px",
      borderRadius: "8px",
    },
    md: {
      fontSize: "14px",
      padding: "0px 15px",
      height: "35px",
      borderRadius: "10px",
    },
    lg: {
      fontSize: "18px",
      padding: "0px 24px",
      height: "44px",
      borderRadius: "12px",
    },
  };

  const buttonStyle = {
    background: "var(--button-blue)",
    color: "white",
    fontFamily: "inter",
    ...(sizeStyles[size] || sizeStyles.md),
  };

  return (
    <div>
      {!publicKey ? (
        <WalletMultiButton style={buttonStyle} />
      ) : (
        <CustomDisconnectButton />
      )}
    </div>
  );
};
