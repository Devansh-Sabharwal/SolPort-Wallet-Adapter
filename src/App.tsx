import { ThemeProvider } from "@/components/theme-provider";
import "@solana/wallet-adapter-react-ui/styles.css";

import WalletAdapter from "./components/WalletAdapter";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background text-foreground">
        <WalletAdapter />
      </div>
    </ThemeProvider>
  );
}
