// Toggle(Switch)은 보통 모바일에서 체크박스 대신 쓰인다.
// Toggle은 input 태그로 만든다.
// checkbox가 보이면 안되기 때문에 체크 박스를 숨겨서 토글을 구현

// user-select : 웹브라우저의 텍스트를 드래그하거나 더블 클릭하여 선택할 수 있다.
import styled from '@emotion/styled';
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
  transition: background-color 0.2 ease-out;
  box-sizing: border-box;

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

export interface Props {
  name?: string;
  on?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

// input인 만큼 name을 받고, on: toggle이 true, false여부
// disabled 여부, onChange: 토글상태가 변화했을 경우 발생하는 이벤트
const Toggle = ({
  name,
  on = false,
  disabled = false,
  onChange,
  ...props
}: Props) => {
  const [checked, toggle] = useToggle(on);
  const handleChange = () => {
    if (typeof toggle === 'function') {
      toggle();
    }
    // onChange를 전달 받았을 때만 실행
    onChange && onChange();
  };

  return (
    <ToggleContainer {...props}>
      <ToggleInput
        type='checkbox'
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <ToggleSwitch />
    </ToggleContainer>
  );
};

export default Toggle;
