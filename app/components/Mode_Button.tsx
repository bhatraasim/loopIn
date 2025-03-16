"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => {
    return typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    // setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setTheme("light")
  };

  return (
    <>
    </>
  );
}