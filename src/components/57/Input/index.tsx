import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import { Combine } from '~/utils';

const Wrapper = styled.div<{ block: boolean }>`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
`;

const StyledInput = styled.input<{ invalid: boolean }>`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : 'gray')};
  box-sizing: border-box;
`;

type Props = Combine<
  {
    label: string;
    block?: boolean;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    wrapperProps?: HTMLAttributes<HTMLDivElement>;
  },
  HTMLAttributes<HTMLInputElement>
>;

const Input = ({
  label,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  readonly = false,
  wrapperProps,
  ...props
}: Props) => {
  return (
    <Wrapper block={block} {...wrapperProps}>
      <Label>{label}</Label>
      <StyledInput
        invalid={invalid}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        {...props}
      />
    </Wrapper>
  );
};
export default Input;
