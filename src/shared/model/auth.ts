import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/shared/api/supabase";

interface AuthState {
  session: Session | null;
  loading: boolean;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  loading: true,
  initialized: false,

  setSession: (session) => set({ session }),

  setLoading: (loading) => set({ loading }),

  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ session: null, loading: false });
  },

  initialize: async () => {
    if (get().initialized) return;

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      set({ session, loading: false, initialized: true });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, loading: false });
      });
    } catch (error) {
      console.error("Auth initialization error:", error);
      set({ loading: false, initialized: true });
    }
  },
}));

export function useSession() {
  const store = useAuthStore();

  if (!store.initialized) {
    store.initialize();
  }

  return {
    session: store.session,
    loading: store.loading,
    logout: store.signOut,
  };
}
