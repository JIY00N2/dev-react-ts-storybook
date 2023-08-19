import { HTMLAttributes } from 'react';

export type BuildFCProps<Base, Element extends HTMLElement> = Base &
  Omit<HTMLAttributes<Element>, keyof Base>;
