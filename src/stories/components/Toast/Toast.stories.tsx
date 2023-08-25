import { Meta, StoryObj } from '@storybook/react';
import Toast from '~/components/60/Toast';

const meta: Meta<typeof Toast> = {
  title: 'Component/Toast',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <button onClick={() => Toast.show('안녕', 3000)}>Show Toast</button>
  ),
};
