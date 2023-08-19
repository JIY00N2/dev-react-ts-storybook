import { Meta, StoryObj } from '@storybook/react';
import Slider from '../components/common/Slider';
import Spacer from '../components/common/Spacer';
import Icon from '../components/common/Icon';
import { css } from '@emotion/react';

const meta: Meta<typeof Slider> = {
  title: 'Common/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    max: {
      control: { type: 'range', min: 10, max: 200 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Slider {...args} />,
  args: {
    min: 0,
    max: 100,
    step: 0.1,
    defaultValue: 50,
    onChange: (value) => console.log(value),
  },
};

export const VolumeControl: Story = {
  render: () => (
    <Spacer>
      <Icon name="volume" />
      <Slider
        css={css`
          width: 100px;
          display: inline-block;
        `}
      />
      <Icon name="volume-2" />
    </Spacer>
  ),
};
