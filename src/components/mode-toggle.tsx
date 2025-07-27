import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="cursor-pointer flex">
      <Sun
        onClick={() => setTheme("light")}
        className="h-5 w-5 sm:h-[1.5rem] sm:w-[1.5rem] scale-0 rotate-0 transition-all dark:scale-100  dark:-rotate-90"
      />
      <Moon
        onClick={() => setTheme("dark")}
        className="absolute h-5 w-5 sm:h-[1.5rem] sm:w-[1.5rem] transition-all scale-100 dark:scale-0"
      />
    </div>
  );
}
