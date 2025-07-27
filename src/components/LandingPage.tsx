import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { ConnectWalletButton } from "./connect-toggle";

export default function LandingPage() {
  const supportedWallets = [
    {
      name: "Phantom",
      icon: "/phantom-icon.svg",
    },
    {
      name: "Backpack",
      icon: "/backpack-icon.svg",
    },
    {
      name: "Metamask",
      icon: "/metamask-icon.svg",
    },
    {
      name: "Solflare",
      icon: "/solflare.svg",
    },
  ];
  return (
    <div>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative z-10">
        <div className="px-4 sm:px-16 py-4">
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
            </div>
          </div>
        </div>
        <div className="px-4 font-inter mt-20 text-4xl sm:text-6xl lg:text-[76px]  text-center tracking-[-0.04em] sm:tracking-[-0.06em] leading-[1] flex justify-center">
          <div>
            <div>
              <div>Lightning-fast wallet integration</div>
              <div className="mt-1.5 sm:mt-3">for Solana dApps.</div>
            </div>
            <div className="mt-8 text-lg  text-center sm:text-2xl font-geist text-gray-500/80 dark:text-gray-400 tracking-tight sm:tracking-tighter">
              No clutter. No compromises. Just clean, developer-first wallet
              connectivity
              <div className="mt-8">
                <ConnectWalletButton size="lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center px-4">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-800 dark:text-white mb-4">
            Supports
          </span>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 items-center">
            {supportedWallets.map((e, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 rounded-xl border transition-all
                   bg-neutral-100 dark:bg-white/5 
                   border-neutral-300 dark:border-white/10 
                   hover:bg-neutral-200 dark:hover:bg-white/10
                   backdrop-blur-sm"
              >
                <img
                  className="rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
                  src={e.icon}
                  alt={e.name}
                />
                <span className="text-base sm:text-lg md:text-xl text-neutral-800 dark:text-white font-medium">
                  {e.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
