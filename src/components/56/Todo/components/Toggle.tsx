import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import useToggle from '~/hooks/useToggle';

const ToggleContainer = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
`;

const ToggleSwitch = styled.div`
  width: 64px;
  height: 30px;
  padding: 2px;
  border-radius: 15px;
  background-color: #ccc;
  box-sizing: border-box;
  transition: background-color 0.2s ease-out;

  &:after {
    content: '';
    position: relative;
    left: 0;
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: white;
    transition: left 0.2s ease-out;
  }
`;

const ToggleInput = styled.input`
  display: none;

  &:checked + div {
    background: lightgreen;
  }
  &:checked + div:after {
    left: calc(100% - 26px);
  }
  &:disabled + div {
    opacity: 0.7;
    cursor: not-allowed;
    &:after {
      opacity: 0.7;
    }
  }
`;

export interface ToggleRequiredProps {
  on?: boolean;
  onChange?: (e: ChangeEvent) => void;
}

const Toggle = ({ on = false, onChange, ...props }: ToggleRequiredProps) => {
  const [checked, toggle] = useToggle(on);
  // e를 넣어줘야 삭제선 그어짐
  const handleChange = (e: ChangeEvent) => {
    toggle();
    onChange && onChange(e);
  };

  return (
    <ToggleContainer {...props}>
      <ToggleInput type='checkbox' checked={checked} onChange={handleChange} />
      <ToggleSwitch />
    </ToggleContainer>
  );
};

export default Toggle;
