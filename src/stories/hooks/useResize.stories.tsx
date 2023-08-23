import { Meta, StoryObj } from '@storybook/react';
import { useResize } from '../../hooks';
import { useState } from 'react';
import Image from '../../components/common/Image';
import { css } from '@emotion/react';

const meta: Meta = {
  title: 'Hook/useResize',
};

export default meta;

const Component = () => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const ref = useResize<HTMLDivElement>(({ width, height }) => {
    setImageSize({ width, height });
  });

  return (
    <div
      ref={ref}
      css={css`
        width: 100%;
        height: 400px;
        background-color: blue;
      `}
    >
      <Image
        width={imageSize.width}
        height={imageSize.height}
        mode="contain"
        src="https://picsum.photos/1000"
        alt="image"
      />
    </div>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: () => <Component />,
};
