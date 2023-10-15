import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface LoyaltyContextType {
  isGlobalDragging: boolean;
  setIsGlobalDragging: (isDragging: boolean) => void;
  placeholderProps: {
    clientHeight: number;
    clientWidth: number;
    clientX: number;
    clientY: number;
  } | null;
  setPlaceholderProps: (placeholderProps: any) => void;
}

const LoyaltyContext = createContext<LoyaltyContextType>({
  isGlobalDragging: false,
  setIsGlobalDragging: () => {},
  placeholderProps: null,
  setPlaceholderProps: () => {},
});

export const LoyaltyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isGlobalDragging, setIsGlobalDragging] = useState(false);
  const [placeholderProps, setPlaceholderProps] = useState(null);

  useEffect(() => {
    console.log("placeholderProps", placeholderProps);
  }, [placeholderProps]);

  return (
    <LoyaltyContext.Provider
      value={{
        isGlobalDragging,
        setIsGlobalDragging,
        placeholderProps,
        setPlaceholderProps,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => useContext(LoyaltyContext);
