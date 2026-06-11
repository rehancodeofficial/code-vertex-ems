import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "./mock-data";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  employeeId: string;
}

interface AuthState {
  user: SessionUser | null;
  login: (email: string, _password: string, remember?: boolean) => Promise<SessionUser>;
  logout: () => void;
  switchRole: (role: Role) => void;
}

// Demo accounts — frontend-only auth
const accounts: Record<string, SessionUser> = {
  "admin@codevertex.io": { id: "u-admin", name: "Admin Vertex", email: "admin@codevertex.io", role: "admin", employeeId: "e2" },
  "ayesha.khan@codevertex.io": { id: "u-ayesha", name: "Ayesha Khan", email: "ayesha.khan@codevertex.io", role: "employee", employeeId: "e1" },
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      async login(email) {
        const found = accounts[email.toLowerCase()];
        const user: SessionUser = found ?? {
          id: "u-guest",
          name: email.split("@")[0],
          email,
          role: "employee",
          employeeId: "e1",
        };
        set({ user });
        return user;
      },
      logout: () => set({ user: null }),
      switchRole: (role) =>
        set((s) => (s.user ? { user: { ...s.user, role } } : s)),
    }),
    { name: "vertex-ems-auth" },
  ),
);
