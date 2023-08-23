import { Meta, StoryObj } from '@storybook/react';
import useSessionStorage from '~/hooks/Storage/useSessionStorage';

const meta: Meta = {
  title: 'Hook/Storage/useSessionStorage',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UseSessionStorageHook = () => {
  const [status, setStatus] = useSessionStorage<string>(
    'status',
    '404 Not Found'
  );
  return (
    <div>
      <button onClick={() => setStatus('200 ok')}>Resend</button>
      {status}
    </div>
  );
};

export const Default: Story = {
  render: () => <UseSessionStorageHook />,
};
