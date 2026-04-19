import React, { createContext, useContext, useState, useCallback } from "react";
import LoadingModal from "../components/modal/loadingModal";


// Create context
const LoadingContext = createContext();

// Provider component
export const LoadingProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Loading...");

  const showLoading = useCallback((text = "Loading...") => {
    setMessage(text);
    setVisible(true);
  }, []);

  const hideLoading = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <LoadingModal visible={visible} text={message} />
    </LoadingContext.Provider>
  );
};

// Custom hook for easy access
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};