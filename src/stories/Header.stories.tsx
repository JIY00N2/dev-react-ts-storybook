import type { Meta, StoryObj } from '@storybook/react';
import Header from '~/components/55/Header';

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    level: { control: { type: 'range', min: 1, max: 6 } },
    strong: { control: 'boolean' },
    underline: { control: 'boolean' },
    color: { control: 'color' },
  },
  args: {
    level: 1,
    strong: false,
    underline: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <>
      <Header {...args}>Header</Header>
    </>
  ),
};
