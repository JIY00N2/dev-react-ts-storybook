import feather, { FeatherAttributes } from 'feather-icons';
import { Combine } from '../../types';
import { HTMLAttributes } from 'react';

type IconProps = Combine<
  {
    name: keyof typeof feather.icons;
    size?: number;
    strokeWidth?: number;
    color?: string;
    rotate?: number;
  },
  HTMLAttributes<HTMLElement>
>;

const Icon = ({
  name,
  size = 16,
  strokeWidth = 2,
  color = '#222',
  rotate = 0,
  ...props
}: IconProps) => {
  const iconStyle: Partial<FeatherAttributes> = {
    'stroke-width': strokeWidth,
    stroke: color,
    width: size,
    height: size,
  };

  const icon = feather.icons[name];
  const svg = icon.toSvg(iconStyle);
  const base64 = btoa(svg);

  return (
    <i
      css={{
        display: 'inline-block',
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
      }}
      {...props}
    >
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
    </i>
  );
};

export default Icon;
