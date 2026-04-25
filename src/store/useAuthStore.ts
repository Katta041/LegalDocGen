import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isAuthenticated: boolean
  username: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

// Simple hardcoded credentials for client-side auth
const USERS: Record<string, string> = {
  admin: "admin123",
  advocate: "legal@2025",
  clerk: "clerk@2025",
  Mohan: "Mohan@321",
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,

      login: (username: string, password: string) => {
        if (USERS[username] && USERS[username] === password) {
          set({ isAuthenticated: true, username })
          return true
        }
        return false
      },

      logout: () => {
        set({ isAuthenticated: false, username: null })
      },
    }),
    { name: "legaldocgen-auth" }
  )
)
