import { useState } from 'react';
import styled from '@emotion/styled';
import { Meta, StoryObj } from '@storybook/react';
import useClickAway from '~/hooks/useClickAway';

const meta: Meta = {
  title: 'Hook/useClickAway',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 버튼을 클릭하면 popover 등장
const Popover = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background-color: #eee;
`;

const PopoverwithHooks = () => {
  const [show, setShow] = useState(false);
  const ref = useClickAway<HTMLDivElement>((e) => {
    const target = e.target as HTMLButtonElement;
    if (target.tagName !== 'BUTTON') {
      setShow(false);
    }
  });
  return (
    <div>
      <button onClick={() => setShow(true)}>Show</button>
      <Popover ref={ref} css={{ display: show ? 'block' : 'none' }}>
        Popover
      </Popover>
    </div>
  );
};

export const Default: Story = {
  render: () => <PopoverwithHooks />,
};
