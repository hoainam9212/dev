import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../api/client';

export interface User {
  id: number;
  email: string;
  displayName: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: async (email, password) => {
        const r = await api<{ token: string; user: User }>('/auth/login', { method: 'POST', body: { email, password } });
        set({ token: r.token, user: r.user });
      },
      register: async (email, password, displayName) => {
        const r = await api<{ token: string; user: User }>('/auth/register', { method: 'POST', body: { email, password, displayName } });
        set({ token: r.token, user: r.user });
      },
      logout: () => {
        set({ token: null, user: null });
        try {
          localStorage.removeItem('ns.lastSync');
        } catch {
          /* ignore */
        }
      },
    }),
    { name: 'ns.auth', storage: createJSONStorage(() => localStorage) },
  ),
);
