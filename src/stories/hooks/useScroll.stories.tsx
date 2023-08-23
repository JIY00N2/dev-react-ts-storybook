import { Meta, StoryObj } from '@storybook/react';
import { useScroll } from '../../hooks';
import { css } from '@emotion/react';

const meta: Meta = {
  title: 'Hook/useScroll',
};

export default meta;

const Component = () => {
  const { ref, state: scrollState } = useScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      css={css`
        position: relative;
        width: 200px;
        height: 200px;
        overflow: scroll;
        background-color: blue;
      `}
    >
      <span
        css={css`
          position: sticky;
          top: 0;
          left: 0;
          color: white;
        `}
      >
        {scrollState.x} {scrollState.y}
      </span>
      <div
        css={css`
          width: 10000px;
          height: 10000px;
          background-color: blue;
        `}
      />
    </div>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: () => <Component />,
};
