// 검색 기능 필요

import styled from '@emotion/styled';
import { ChangeEventHandler } from 'react';

const Input = styled.input`
  width: 100%;
  padding: 4px;
  border: 1px solid gray;
  border-radius: 4px;
  box-sizing: border-box;
`;

// onChange가 발생할때 input 태그의 value를 onSearch에게 전달
const SearchBox = ({
  onSearch,
}: {
  onSearch: (searchValue: string) => void;
}) => {
  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onSearch(e.target.value);
  };
  return <Input onChange={handleSearchChange} />;
};

/*const SearchBox = ({ onSearch }) => {
  return <Input onChange={(e) => onSearch(e.target.value)} />;
};*/

export default SearchBox;
