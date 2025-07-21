import { AppHeader } from "@/features/header";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-slate-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <AppHeader />
      <main className="container mx-auto relative">
        <Outlet />
      </main>
    </div>
  );
}
