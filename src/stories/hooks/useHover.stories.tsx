import { Meta, StoryObj } from '@storybook/react';
import useHover from '../../hooks/useHover';

import { css } from '@emotion/react';

const meta: Meta = {
  title: 'Hook/useHover',
};

export default meta;

const Box = () => {
  const [ref, isHover] = useHover<HTMLDivElement>();
  return (
    <div
      ref={ref}
      css={css`
        width: 100px;
        height: 100px;
        background-color: ${isHover ? 'red' : 'blue'};
      `}
    />
  );
};

export const Default: StoryObj<typeof meta> = {
  render: () => <Box />,
};
