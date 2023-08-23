import { Meta, StoryObj } from '@storybook/react';
import useLocalStorage from '~/hooks/Storage/useLocalStorage';

const meta: Meta = {
  title: 'Hook/Storage/useLocalStorage',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const UseLocalStorageHook = () => {
  const [status, setStatus] = useLocalStorage<string>(
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
  render: () => <UseLocalStorageHook />,
};
