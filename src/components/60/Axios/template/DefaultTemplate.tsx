import Menu from '../Menu';
import React from 'react';

// 어떤 페이지를 가든 항상 보여지는 템플릿 페이지
const DefaultTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Menu />
      <main>{children}</main>
    </div>
  );
};

export default DefaultTemplate;
