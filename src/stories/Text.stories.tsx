import type { Meta, StoryObj } from '@storybook/react';
import Text from '../components/55/Text/index';

const meta: Meta<typeof Text> = {
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['small', 'normal', 'large', 20, undefined],
      control: 'inline-radio',
    },
    strong: { control: 'boolean' },
    underline: { control: 'boolean' },
    delete: { control: 'boolean' },
    color: { control: 'color' },
    block: { control: 'boolean' },
    paragraph: { control: 'boolean' },
    mark: { control: 'boolean' },
    code: { control: 'boolean' },
  },
  args: {
    block: false,
    paragraph: false,
    size: 20,
    strong: false,
    delete: false,
    underline: false,
    mark: false,
    code: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <>
      <Text {...args}>Text</Text>
      <Text {...args}>Text</Text>
    </>
  ),
  args: {},
};

export const Size: Story = {
  render: (args) => (
    <>
      <Text {...args} size='small'>
        small
      </Text>
      <Text {...args} size='normal'>
        normal
      </Text>
      <Text {...args} size='large'>
        large
      </Text>
      <Text {...args} size={24}>
        Etc
      </Text>
    </>
  ),
};
