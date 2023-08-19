import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import useToggle from '../../hooks/useToggle';

type Props = {
  name: string;
  on?: boolean;
  disabled?: boolean;
  onChange?: () => void;
} & HTMLAttributes<HTMLLabelElement>;

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
  box-sizing: border-box;
  background-color: #ccc;
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
    background-color: lightgreen;
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

const Toggle = ({
  name,
  on = false,
  disabled = false,
  onChange = () => {},
  ...props
}: Props) => {
  const [checked, toggle] = useToggle(on);

  return (
    <ToggleContainer {...props}>
      <ToggleInput
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={() => {
          toggle();
          onChange();
        }}
      />
      <ToggleSwitch />
    </ToggleContainer>
  );
};

export default Toggle;