import { Meta, StoryObj } from '@storybook/react';
import Text from '../components/common/Text';

const meta: Meta<typeof Text> = {
  title: 'Common/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    as: {
      options: ['div', 'p', 'span', 'h1'],
      control: 'inline-radio',
    },
    size: {
      options: ['small', 'normal', 'large', 20, undefined],
      control: 'inline-radio',
    },
    color: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <Text {...args}>Text1</Text>
        <Text {...args}>Text2</Text>
      </>
    );
  },
  args: {
    size: 'large',
    del: false,
    code: false,
    strong: false,
    underline: false,
  },
};
