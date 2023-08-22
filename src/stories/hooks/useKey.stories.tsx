import { Meta, StoryObj } from '@storybook/react';
import useKey from '~/hooks/useKey';

const meta: Meta<typeof useKey> = {
  title: 'Hook/useKey',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const UseKeyHooks = () => {
  useKey('keydown', 'd', () => {
    alert('d key down');
  });

  useKey('keyup', 'f', () => {
    alert('f key up');
  });
  return null;
};

export const Default: Story = {
  render: () => <UseKeyHooks />,
};
