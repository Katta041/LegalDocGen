import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isAuthenticated: boolean
  username: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

// Demo gate, not security. This app has no backend, so any check here runs in
// the browser and can be bypassed. A single demo account is read from Vite env
// vars at build time (see .env.example) and defaults to demo / demo.
const DEMO_USERNAME = (import.meta.env.VITE_DEMO_USERNAME as string | undefined) || "demo"
const DEMO_PASSWORD = (import.meta.env.VITE_DEMO_PASSWORD as string | undefined) || "demo"
const USERS: Record<string, string> = {
  [DEMO_USERNAME]: DEMO_PASSWORD,
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
