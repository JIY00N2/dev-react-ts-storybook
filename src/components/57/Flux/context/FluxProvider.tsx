import { createContext } from 'react';

type Props = {
  children: React.ReactNode;
  gap: number | [number, number];
};

export const FluxContext = createContext<{
  gap: number | [number, number];
} | null>(null);

const FluxProvider = ({ children, gap = 0 }: Props) => {
  return (
    <FluxContext.Provider value={{ gap }}>{children}</FluxContext.Provider>
  );
};
export default FluxProvider;
