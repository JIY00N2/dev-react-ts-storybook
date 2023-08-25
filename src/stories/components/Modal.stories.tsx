import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from '~/components/60/Modal';

const meta: Meta<typeof Modal> = {
  title: 'Component/ Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Component = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(true)}>Show Modal</button>
      <Modal visible={visible}>
        Hi!<button onClick={() => setVisible(false)}>close</button>
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: () => <Component />,
};
