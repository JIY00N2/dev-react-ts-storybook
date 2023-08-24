import { Meta, StoryObj } from '@storybook/react';
import useTimeout from '~/hooks/Timeout/useTimeout';

const meta: Meta<typeof useTimeout> = {
  title: 'Hook/Timeout/useTimeout',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Component = () => {
  const clear = useTimeout(() => {
    alert('실행');
  }, 3000);
  return (
    <>
      <div>useTimeout 테스트</div>
      <button onClick={clear}>멈춰!</button>
    </>
  );
};

export const Default: Story = {
  render: () => <Component />,
};
