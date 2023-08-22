import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import styled from '@emotion/styled';
import useResize from '~/hooks/useResize';
import Image from '~/components/55/ImageComponent';

const meta: Meta<typeof useResize> = {
  title: 'Hook/useResize',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Background = styled.div`
  width: 100%;
  height: 400px;
  background-color: blue;
`;

const UseResizeHook = () => {
  // 이미지 상태 받기
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const ref = useResize((rect) => {
    setImageSize({ width: rect.width, height: rect.height });
  });

  return (
    <Background ref={ref}>
      <Image
        width={imageSize.width}
        height={imageSize.height}
        src='https://picsum.photos/1000'
        mode='contain'
        alt='image'
      />
    </Background>
  );
};

export const Default: Story = {
  render: (args) => <UseResizeHook {...args} />,
};
