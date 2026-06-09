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
  Mohan: "mohan@321",
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,

      login: (username: string, password: string) => {
        const userEntry = Object.entries(USERS).find(
          ([key]) => key.toLowerCase() === username.toLowerCase()
        )
        
        if (userEntry && userEntry[1] === password) {
          set({ isAuthenticated: true, username: userEntry[0] }) // store original casing
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
