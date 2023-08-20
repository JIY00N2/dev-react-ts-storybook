import { Meta, StoryObj } from '@storybook/react';
import Spinner from '~/components/55/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Component/Spinner',
  component: Spinner,
  tags: ['autodocs'],
};
export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Spinner {...args} />,
};
