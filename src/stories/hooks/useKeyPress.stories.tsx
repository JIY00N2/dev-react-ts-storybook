import { Meta, StoryObj } from '@storybook/react';
import useKeyPress from '~/hooks/useKeyPress';

const meta: Meta = {
  title: 'Hook/useKeyPress',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const UseKeyPressHooks = () => {
  // ?를 눌렀을때 특정값이 나오게 하기
  // ?키를 누르면 도움말을 보여줍니다 같은거
  const pressed = useKeyPress('?');
  return <div>{pressed ? 'peek a boo' : 'Press ? Key'}</div>;
};

export const Default: Story = {
  render: () => <UseKeyPressHooks />,
};
