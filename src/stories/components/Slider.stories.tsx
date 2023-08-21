// import { css } from '@emotion/react';
import { Meta, StoryObj } from '@storybook/react';
// import Icon from '~/components/56/Icon';
import Slider from '~/components/56/Slider';

const meta: Meta<typeof Slider> = {
  title: 'Component/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Slider {...args} />,
  args: {
    defaultValue: 1,
    min: 1,
    max: 100,
    step: 0.1,
  },
};

// export const VolumeControl: Story = {
//   render: (args) => (
//     <Spacer>
//       <Icon name='volume' />
//       <Slider
//         css={css`
//           width: 100;
//           display: inline-block;
//         `}
//       />
//       <Icon name='volume-2' />
//     </Spacer>
//   ),
// };
