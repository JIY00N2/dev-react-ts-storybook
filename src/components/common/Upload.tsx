import { DragEventHandler, HTMLAttributes, useRef, useState } from 'react';
import { Combine } from '../../types';

type UploadProps = Combine<
  {
    children: React.FC<{ file?: File; dragging: boolean }> | React.ReactNode;
    name: string;
    droppable?: boolean;
    accept?: string;
    value?: File;
    onChange?: (file: File) => void;
  },
  HTMLAttributes<HTMLDivElement>
>;

const Upload = ({
  children,
  name,
  droppable = true,
  accept,
  value,
  onChange,
  ...props
}: UploadProps) => {
  const [file, setFile] = useState<File | undefined>(value);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handelFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files) {
      const selectedFile = files[0];
      setFile(selectedFile);
      onChange && onChange(selectedFile);
    }
  };

  const chooseFile = () => {
    inputRef.current?.click();
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    if (!droppable) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    if (!droppable) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    if (!droppable) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragDrop: DragEventHandler<HTMLDivElement> = (e) => {
    if (!droppable) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    const selectedFile = files[0];
    setFile(selectedFile);
    onChange && onChange(selectedFile);

    setDragging(false);
  };

  return (
    <div
      onClick={chooseFile}
      onDrop={handleDragDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      css={{
        display: 'inline-block',
        cursor: 'pointer',
      }}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handelFileChange}
        css={{ display: 'none' }}
      />
      {typeof children === 'function' ? children({ file, dragging }) : children}
    </div>
  );
};

export default Upload;
