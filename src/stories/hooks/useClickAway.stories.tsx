import { Meta, StoryObj } from '@storybook/react';
import { useClickAway } from '../../hooks';
import { css } from '@emotion/react';

const meta: Meta = {
  title: 'Hook/useClickAway',
};

export default meta;

const Component = () => {
  const ref = useClickAway<HTMLDivElement>((e) => {
    console.log('click away!! clicked: ', e.target);
  });

  return (
    <div
      css={css`
        height: 200px;
        background-color: skyblue;
      `}
    >
      <div
        ref={ref}
        css={css`
          height: 100px;
          background-color: blue;
        `}
      />
    </div>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: () => <Component />,
};
