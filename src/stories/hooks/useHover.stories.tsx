import styled from '@emotion/styled';
import { Meta, StoryObj } from '@storybook/react';
import useHover from '~/hooks/useHover';

const meta: Meta<typeof useHover> = {
  title: 'Hook/useHover',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: pink;
`;

const BoxWithHooks = () => {
  const [ref, hover] = useHover();
  return (
    <>
      <Box ref={ref} />
      {hover ? <div>Tool Tips!</div> : null}
    </>
  );
};
export const Default: Story = {
  render: () => <BoxWithHooks />,
};

// const Box = () => {
//   const [ref, isHover] = useHover<HTMLDivElement>();
//   return (
//     <div
//       ref={ref}
//       css={css`
//         width: 100px;
//         height: 100px;
//         background-color: ${isHover ? 'red' : 'blue'};
//       `}
//     />
//   );
// };

// export const Default: StoryObj<typeof meta> = {
//   render: () => <Box />,
// };
