import { ChangeEvent, FormEvent, useState } from 'react';

export type FormErrors<T> = Partial<Record<keyof T, string>>;

type Props<T> = {
  initialValues: T;
  onSubmit: () => void;
  validate: (values: T) => FormErrors<T>;
};

function useForm<T extends object>({
  initialValues,
  onSubmit,
  validate,
}: Props<T>) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent) => {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const { name, value } = target;
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      onSubmit();
    } else {
      setErrors(newErrors);
    }
    setIsLoading(false);
  };

  return { values, errors, isLoading, handleChange, handleSubmit };
}

export default useForm;
