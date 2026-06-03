"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";

const PR_LIGHT = "/themes/lara-light.css";
const PR_DARK  = "/themes/lara-dark.css";

export function ThemeProvider({ children }) {
  const dark = useThemeStore((s) => s.dark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);

    let link = document.getElementById("pr-theme");
    if (!link) {
      link = document.createElement("link");
      link.id  = "pr-theme";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = dark ? PR_DARK : PR_LIGHT;
  }, [dark]);

  return children;
}
