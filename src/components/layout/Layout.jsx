import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { GlobalGamification } from "../ui/GlobalGamification";
import { useSync } from "../../hooks/useSync";

export const Layout = () => {
  useSync(); // Mount sync listener globally

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex flex-col transition-colors duration-300 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-indigo/5 blur-[120px] pointer-events-none animate-blob" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none animate-blob-delayed" />
      <div className="fixed top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-brand-cyan/3 blur-[100px] pointer-events-none animate-blob-delayed-2" />
      
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-50" />
      
      
      <GlobalGamification />

      <Navbar />
      <main className="flex-1 w-full flex flex-col z-10 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
