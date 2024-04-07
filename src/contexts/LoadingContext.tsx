// contexts/LoadingContext.tsx
import { createContext, useContext, useState } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  data: any; // Use a more specific type based on your data
  setData: (data: any) => void; // Use a more specific type based on your data
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }: any) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null); // Initialize with your data structure

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, data, setData }}>
      {children}
    </LoadingContext.Provider>
  );
};
