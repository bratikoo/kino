import { Clapperboard } from "lucide-react";

export function AppHeader() {
  return (
    <header className="py-3 px-4 mb-6 bg-linear-to-r from-cyan-500 to-blue-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clapperboard className="text-white" />
          <h1 className="scroll-m-20 text-center text-2xl tracking-tight text-balance text-white">
            WhatToWatch
          </h1>
        </div>
      </div>
    </header>
  );
}
