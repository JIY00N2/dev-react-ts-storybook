import { useContext } from 'react';
import { FluxContext } from './FluxProvider';

export const useFluxContext = () => {
  const context = useContext(FluxContext);
  if (!context) {
    throw new Error('useFluxContext는 FlexProvider와 함께 사용해야 합니다!');
  }
  return context;
};
