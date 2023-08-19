// input을 숨기고 이쁘게 만들자
// input 태그가 보이지 않기 때문에 직접 접근하려면 useRef 사용

// 파일이 바뀌었는지 확인하기가 어렵다 -> 파일에 대한 정보를 부모나 자식 컴포넌트들이 받을 수 있게 해야 함
// 부모로 넘기는 것은 onChange를 이용할 수 있지만 자식으로 넘기는 것은 어려울 수 있다.
// children을 jsx로 반환한 함수로 받을 수 있게 만든다.
// {typeof children === 'function' ? children(file) : children}
// 함수일 경우 함수를 실행한 것을 보여주고 아니면 그냥 보여줌
import styled from '@emotion/styled';
import {
  useRef,
  HTMLAttributes,
  useState,
  ChangeEventHandler,
  DragEventHandler,
} from 'react';
import { Combine } from '~/utils';

const UploadContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

type UploadRequiredProps = Combine<
  {
    children: React.FC<{ file?: File; dragging: boolean }> | React.ReactNode;
    droppable?: boolean;
    name?: string;
    accept?: string;
    value?: File;
    onChange?: (file: File) => void;
  },
  HTMLAttributes<HTMLDivElement>
>;

// droppable: 드래그앤 드랍 여부
const Upload = ({
  children,
  droppable,
  name,
  accept,
  value,
  onChange,
  ...props
}: UploadRequiredProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // 파일 상태 만들기
  const [file, setFile] = useState<File | undefined>(value);
  const [dragging, setDragging] = useState(false);

  // 파일 선택하고 나면 파일에 대한 정보를
  // setFile를 통해 담을 수 있또록 이벤트 핸들러 작성
  // onChange 이벤트를 받아와서 부모 컴포넌트가 이벤트에 대해 대응할 수 있도록 만들기
  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files) {
      const changedFile = files[0];
      setFile(changedFile);
      onChange && onChange(changedFile);
    }
  };

  // input 요소에 직접 접근해서 클릭 이벤트 호출
  const handleChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // 1. 드래그를 통해서 컴포넌트 내부로 들어왔을 경우
  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    if (!droppable) return;
    e.preventDefault(); // 브라우저 기본 이벤트를 막는다.
    e.stopPropagation(); // 부모나 자식 컴포넌트로 이벤트가 전파되는 것을 막는다.
    // e.dataTransfer.items: 드래그 앤 드롭 이벤트에서 드래그 중인 항목(아이템)들에 대한 정보를 가지고 있는 속성입
    if (e.dataTransfer.items && e.dataTransfer.items.length) {
      setDragging(true);
    }
  };
  // 2. 드래그를 하다가 컴포넌트 바깥으로 나갔을 경우
  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    if (!droppable) return;
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  // 3. 이벤트 전파를 방지 -> 브라우저에서 새창이 열리는거 방지
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    if (!droppable) return;
    e.preventDefault();
    e.stopPropagation();
  };
  // 4. 파일을 컴포넌트 위에 놨을 경우
  const handleFileDrop: DragEventHandler<HTMLDivElement> = (e) => {
    if (!droppable) return;
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    const changedFile = files[0];
    setFile(changedFile);
    onChange && onChange(changedFile);
    setDragging(false);
  };

  // {children} 받은 자식 요소나 컴포넌트들을 보여줌
  return (
    <UploadContainer
      onClick={handleChooseFile}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      {...props}
    >
      <Input
        ref={inputRef}
        type='file'
        name={name}
        accept={accept}
        onChange={handleChangeFile}
      />
      {typeof children === 'function' ? children({ file, dragging }) : children}
    </UploadContainer>
  );
};

export default Upload;
