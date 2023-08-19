import { useContext } from 'react';
import { FlexContext } from './FlexProvider';

export const useFlexContext = () => {
  const context = useContext(FlexContext);
  if (!context) {
    throw new Error('useFlexContext는 FlexProvider와 함께 쓰여야 합니다.');
  }
  return context;
};
