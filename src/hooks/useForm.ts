import { ChangeEvent, useState, FormEvent } from 'react';

/*1. keyof T: T타입의 모든 프로퍼티 이름을 가져옴
  예를 들어, T가 { name: string; age: number }인 경우, keyof T는 "name"과 "age"
  2. Record<keyof T, string>: keyof T에 대응하는 각 프로퍼티 이름을 string 타입으로 매핑
   이는 { name: string; age: string }와 같이 프로퍼티 이름을 string 타입으로 바꾸어주는 역할
  3. Partial<...>: 모든 프로퍼티 옵셔널
  제네릭을 이용하여, 객체의 각 프로퍼티에 대한 유효성 검사 오류를 저장하기 위한 타입을 정의
  */
export type FormErrors<T> = Partial<Record<keyof T, string>>;

type Props<T> = {
  initialValue: T; // 초기 폼 값으로 사용할 객체의 타입 T
  onSubmit: () => void; // 폼 제출 시 호출할 콜백 함수
  validate: (values: T) => FormErrors<T>; //  폼 값의 유효성을 검사할 콜백 함수로, values를 받아 FormErrors<T> 타입을 반환
};
// T가 객체 타입이어야 함
const useForm = <T extends object>({
  initialValue,
  onSubmit,
  validate,
}: Props<T>) => {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // value가 있다면, value들을 업데이트 해주는 로직
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    // values들을 넘겨서 에러 체크
    const newErrors = validate(values);
    // 새로운 에러들이 없다면
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      // onSubmit 실행
      onSubmit();
    } else {
      setErrors(newErrors);
    }
    // 아니라면 에러 처리
    setIsLoading(false);
  };

  return { values, errors, isLoading, handleChange, handleSubmit };
};

export default useForm;
