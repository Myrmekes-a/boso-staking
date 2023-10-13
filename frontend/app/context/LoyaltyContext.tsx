import React, { ReactNode, createContext, useContext, useState } from "react";

interface LoyaltyContextType {
  isGlobalDragging: boolean;
  setIsGlobalDragging: (isDragging: boolean) => void;
}

const LoyaltyContext = createContext<LoyaltyContextType>({
  isGlobalDragging: false,
  setIsGlobalDragging: () => {},
});

export const LoyaltyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isGlobalDragging, setIsGlobalDragging] = useState(false);

  return (
    <LoyaltyContext.Provider
      value={{
        isGlobalDragging,
        setIsGlobalDragging,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => useContext(LoyaltyContext);
