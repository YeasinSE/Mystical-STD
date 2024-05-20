"use client";

import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { useLayout } from "@/providers/layout-provider";

const inter = Inter({ subsets: ["latin"] });

export function App({ children }: PropsWithChildren) {
  const { showMenu } = useLayout();

  return (
    <body
      className={`${inter.className} overflow-x-hidden ${
        showMenu ? "overflow-y-hidden" : ""
      }`}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </body>
  );
}
