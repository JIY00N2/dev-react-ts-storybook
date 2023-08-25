import { Meta, StoryObj } from '@storybook/react';
import useTimeoutFn from '~/hooks/Timeout/useTimeoutFn';

const meta: Meta<typeof useTimeoutFn> = {
  title: 'Hook/Timeout/useTimeoutFn ',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Component = () => {
  const { run, clear } = useTimeoutFn(() => {
    alert('실행');
  }, 3000);
  return (
    <>
      <div>useTimeoutFn 테스트</div>
      <button onClick={run}>3초 뒤 실행!</button>
      <button onClick={clear}>멈춰!</button>
    </>
  );
};

export const Default: Story = {
  render: () => <Component />,
};
