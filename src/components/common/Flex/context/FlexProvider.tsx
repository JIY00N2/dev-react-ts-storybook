import { createContext } from 'react';

export const FlexContext = createContext<{
  gap: number | [number, number];
} | null>(null);

const FlexProvider = ({
  children,
  gap,
}: {
  children: React.ReactNode;
  gap: number | [number, number];
}) => {
  return (
    <FlexContext.Provider value={{ gap }}>{children}</FlexContext.Provider>
  );
};

export default FlexProvider;
