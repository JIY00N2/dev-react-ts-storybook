import { Meta, StoryObj } from '@storybook/react';
import Input from '~/components/57/Input';

const meta: Meta<typeof Input> = {
  title: 'Component/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Label',
    block: false,
    invalid: false,
    required: false,
    disabled: false,
    readonly: false,
  },
};
