// Slider 컴포넌트는 볼륨 조절 or 비디오 재생 바
// 최저, 최고 수치, 간격(step), 값 넣기(input 역할)
// 값이 변할 경우 사용자가 부모 컴포넌트로 이벤트 전달을 위한 onChange 받기
// Slider는 보통 요소 3가지 (막대, 상태, 조절버튼)
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  useState,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  MouseEventHandler,
} from 'react';
import { Combine } from '~/utils';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`;

const Rail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #aaa;
`;

const Handle = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  width: 17px;
  height: 17px;
  transform: translate(-50%, -50%);
  border: 2px solid #44b;
  border-radius: 50%;
  background-color: white;
  cursor: grab;
`;

// 현재 너비
const Track = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: 4px;
  border-radius: 2px;
  background-color: #44b;
`;

type Props = Combine<
  {
    min: number;
    max: number;
    step: number;
    defaultValue?: number;
    onChange: (value: number) => void;
  },
  HTMLAttributes<HTMLDivElement>
>;

const Slider = ({
  min = 0,
  max = 100,
  step = 0.1,
  defaultValue,
  onChange,
  ...props
}: Props) => {
  // 클릭, 드래그 여부 상태
  const [dragging, setDragging] = useState(false);
  const [value, setValue] = useState(defaultValue ? defaultValue : min);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // 마우스 move, up , down 이벤트 필요
  // 상태가 변해도 변하지 않을 함수 -> useCallback 이용해서 최적화
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 드래그 중이 아닐 때는 이벤트 실행 x
      if (!dragging || !sliderRef.current) return;
      // 위치를 알아야 함 -> Slider의 위치를 알아야 함 -> useRef 이용

      // 해당 마우스 위치
      const handleOffset = e.pageX - sliderRef.current.offsetLeft;
      // 슬라이더의 너비
      const sliderWidth = sliderRef.current.offsetWidth;
      // 현재까지의 위치
      const track = handleOffset / sliderWidth;
      let newValue = min;
      if (track > 1) {
        newValue = max;
      } else if (track >= 0 && track <= 1) {
        // 슬라이더 중간 클릭했을때
        // (max - min) * track(0~1)) => ex. min = 0, max = 100 ,중간위치, step = 10 => 50% 위치에 해당하는 값
        // min + (max - min) * track => 50(중간 위치에 해당하는 값)
        // Math.round(50/10) * 10 => 50
        newValue = Math.round((min + (max - min) * track) / step) * step;
        // 반올림했을때 0인경우, 값이 깨지는 경우가 있다. step이 클때
        // min, max가 벗어나지 않도록 다시 계산해줌
        newValue = Math.min(Math.max(min, newValue));
      }
      setValue((oldValue) => {
        if (oldValue === newValue) {
          return oldValue;
        }
        onChange && onChange(newValue);
        return newValue;
      });
    };
    // 이벤트 전역으로 만들기
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
  }, [value, min, max, dragging, sliderRef, handleMouseUp, onChange, step]);

  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <SliderContainer ref={sliderRef} {...props}>
      <Rail />
      <Track
        css={css`
          width: ${percentage}%;
        `}
      />
      <Handle
        onMouseDown={handleMouseDown}
        css={css`
          left: ${percentage}%;
        `}
      />
    </SliderContainer>
  );
};

export default Slider;
