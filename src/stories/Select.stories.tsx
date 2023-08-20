import { Meta, StoryObj } from '@storybook/react';
import Select from '~/components/57/Select';

const meta: Meta<typeof Select> = {
  title: 'Component/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select
      {...args}
      data={['item1', 'item2', { label: 'item3', value: 'value' }]}
      label='Label'
    />
  ),
  args: {
    label: 'Label',
    placeholder: 'ItemList',
    block: false,
    invalid: false,
    required: false,
    disabled: false,
  },
};
