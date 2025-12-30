"use client";
import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

// Better Auth uses hooks, so Context might be redundant but useful for global state wrapping
// For MVP, we'll just export a hook wrapper or context if needed.
// Task says "Create User Context/Provider".
// We will use authClient.useSession()

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = authClient.useSession();
  
  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
