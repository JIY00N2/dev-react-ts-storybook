import { Meta, StoryObj } from '@storybook/react';
import Spinner from '../components/common/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Common/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 10, max: 200 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <Spinner {...args} />;
  },
  args: {
    size: 50,
    color: 'black',
    loading: true,
  },
};
