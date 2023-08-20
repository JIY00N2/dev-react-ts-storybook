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

const StyledSelect = styled.select<{ invalid: boolean }>`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : 'gray')};
  box-sizing: border-box;
`;

type DataItem = string | { label: string; value: string };

type Props = Combine<
  {
    data: DataItem[];
    label: string;
    placeholder?: string;
    block?: boolean;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
    wrapperProps?: HTMLAttributes<HTMLDivElement>;
  },
  HTMLAttributes<HTMLSelectElement>
>;

// 옵션 데이터(data),
// 1. data: string
// 2. data: object -> {label: string, value: string}
const Select = ({
  data, // data는 string 또는 객체
  label,
  placeholder,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  wrapperProps,
  ...props
}: Props) => {
  const formattedData = data.map((item) =>
    typeof item === 'string' ? { label: item, value: item } : item
  );
  const options = formattedData.map((item) => (
    <option key={item.value} value={item.value}>
      {item.label}
    </option>
  ));

  if (placeholder) {
    options.unshift(
      <option key='placeholder' value='' hidden>
        {placeholder}
      </option>
    );
  }

  return (
    <Wrapper block={block} {...wrapperProps}>
      <Label>{label}</Label>
      <StyledSelect
        placeholder={placeholder}
        invalid={invalid}
        required={required}
        disabled={disabled}
        {...props}
      >
        {options}
      </StyledSelect>
    </Wrapper>
  );
};

export default Select;
