"use client";

import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useLayout } from "@/providers/layout-provider";
import { Button } from "@/components/ui";
import { ThemeToggle } from "@/components";

export function MobileNavbar() {
  const { setShowMenu, showMenu } = useLayout();

  return (
    <>
      <Button
        variant="ghost"
        className="sm:hidden"
        id="button"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? <Cross1Icon /> : <HamburgerMenuIcon />}
      </Button>
      {showMenu ? (
        <div className="absolute left-0 top-[65px] py-4 w-screen h-[calc(100vh-64px)] z-10 dark:bg-black bg-white">
          <div className="container">
            <Button className="w-fit" variant="ghost">
              Sign out
            </Button>
            <div className="absolute w-fit right-8 top-4">
              <ThemeToggle variant="ghost" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
