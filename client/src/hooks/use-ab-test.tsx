import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";

type Variant = "A" | "B" | "C";

interface ABTestContextType {
  variant: Variant;
  recordView: () => Promise<void>;
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

interface ABTestProviderProps {
  children: ReactNode;
}

export function ABTestProvider({ children }: ABTestProviderProps) {
  const [variant, setVariant] = useState<Variant>("A");

  useEffect(() => {
    // Check for URL parameter to force specific variant (for testing)
    const urlParams = new URLSearchParams(window.location.search);
    const forceVariant = urlParams.get("variant") as Variant;
    
    if (forceVariant && (forceVariant === "A" || forceVariant === "B" || forceVariant === "C")) {
      setVariant(forceVariant);
      localStorage.setItem("ab-test-variant", forceVariant);
      return;
    }
    
    // Check if user already has a variant stored
    const storedVariant = localStorage.getItem("ab-test-variant") as Variant;
    
    if (storedVariant && (storedVariant === "A" || storedVariant === "B" || storedVariant === "C")) {
      setVariant(storedVariant);
    } else {
      // Randomly assign variant (33.33% split between A, B, C)
      const random = Math.random();
      const newVariant: Variant = random < 0.33 ? "A" : random < 0.66 ? "B" : "C";
      setVariant(newVariant);
      localStorage.setItem("ab-test-variant", newVariant);
    }
  }, []);

  const recordView = async () => {
    try {
      await apiRequest("POST", "/api/ab-test/view", { variant });
    } catch (error) {
      console.error("Failed to record view:", error);
    }
  };

  return (
    <ABTestContext.Provider value={{ variant, recordView }}>
      {children}
    </ABTestContext.Provider>
  );
}

export function useABTest() {
  const context = useContext(ABTestContext);
  if (context === undefined) {
    throw new Error("useABTest must be used within an ABTestProvider");
  }
  return context;
}