"use client";

import * as React from "react";
import { RxMoon as MoonIcon } from "react-icons/rx";
import { IoSunnyOutline as SunIcon } from "react-icons/io5";
import { useTheme } from "next-themes";

import { Button, ButtonProps } from "@/components/ui/button";
interface ThemeToggleProps {
  variant?: ButtonProps["variant"];
}
export function ThemeToggle({ variant = "outline" }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
