import type { Meta, StoryObj } from '@storybook/react';
import Toggle from '~/components/56/Todo/components/Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Component/Todo/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {
    on: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <>
      <Toggle {...args} />
    </>
  ),
};
