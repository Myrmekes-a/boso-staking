import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface LoyaltyContextType {
  isGlobalDragging: "staking" | "unstaking" | false;
  setIsGlobalDragging: (isDragging: "staking" | "unstaking" | false) => void;
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
  const [isGlobalDragging, setIsGlobalDragging] = useState<
    "staking" | "unstaking" | false
  >(false);

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
