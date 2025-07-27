import ConnectWallet from "./connect-toggle";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <div className="px-4 sm:px-16 border-b-2 py-4 bg-[#ebeaea] dark:bg-background">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 sm:gap-2">
          <img
            src="logo.png"
            className="hidden dark:block w-8 h-8 sm:w-10 sm:h-10"
          />
          <img
            src="logo-light.png"
            className="dark:hidden w-8 h-8 sm:w-10 sm:h-10"
          />
          <span className="text-2xl sm:text-3xl font-semibold tracking-tighter">
            SolPort
          </span>
        </div>
        <div className="flex gap-5 sm:gap-8 items-center">
          <ModeToggle />
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}
