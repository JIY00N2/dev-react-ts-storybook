import { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import useScroll from '~/hooks/useScroll';

const meta: Meta<typeof useScroll> = {
  title: 'Hook/useScroll',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 자식 element가 있을 경우에 스크롤 가능
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: pink;
  overflow: auto;
`;
const Inner = styled.div`
  width: 10000px;
  height: 10000px;
  background-image: linear-gradient(180deg, #000 0%, #fff 100%);
`;

const BoxWithHooks = () => {
  const [ref, coord] = useScroll<HTMLDivElement>();
  return (
    <>
      <Box ref={ref}>
        <Inner />
      </Box>
      <button
        onClick={() => {
          if (!ref.current) return;
          ref.current.scrollTo({ top: 20000, left: 20000, behavior: 'smooth' });
        }}
      >
        Scroll
      </button>
      {coord.x} , {coord.y}
    </>
  );
};

export const Default: Story = {
  render: () => <BoxWithHooks />,
};
