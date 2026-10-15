"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "cretop-landing-theme";
type Theme = "classic" | "terminal" | "apple";
const NEXT_THEME: Record<Theme, Theme> = { classic: "terminal", terminal: "apple", apple: "classic" };
const THEME_NAME: Record<Theme, string> = { classic: "기본", terminal: "터미널", apple: "애플 컬러" };

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("classic");

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_KEY);
    const current: Theme = saved === "terminal" || saved === "apple" ? saved : "classic";
    document.querySelector(".site-shell")?.setAttribute("data-theme", current);
    setTheme(current);
  }, []);

  function toggleTheme() {
    const next = NEXT_THEME[theme];
    document.querySelector(".site-shell")?.setAttribute("data-theme", next);
    window.localStorage.setItem(THEME_KEY, next);
    setTheme(next);
  }

  return (
    <button className={`theme-toggle theme-toggle-${theme}`} type="button" onClick={toggleTheme} aria-label={`현재 ${THEME_NAME[theme]} 스타일. 다음은 ${THEME_NAME[NEXT_THEME[theme]]} 스타일로 변경`} title={`현재 스타일: ${THEME_NAME[theme]}`}>
      {theme === "terminal" ? <Sun size={15} /> : <Moon size={15} />}
      <span>배경 변경</span>
      <i className="theme-dots" aria-hidden="true"><b /><b /><b /><b /></i>
    </button>
  );
}
