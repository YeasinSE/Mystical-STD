"use client";
import { createContext, useCallback, useContext, useState } from "react";

type Layout = {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
};

const defaultLayout: Layout = {
  showMenu: false,
  setShowMenu: () => {},
};

const LayoutContext = createContext<Layout>(defaultLayout);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [showMenu, setShowMenuBase] = useState(false);
  const setShowMenu = useCallback((show: boolean) => {
    setShowMenuBase(show);
  }, []);
  return (
    <LayoutContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
