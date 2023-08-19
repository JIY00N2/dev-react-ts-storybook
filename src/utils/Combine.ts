export type Combine<T, K> = T & Omit<K, keyof T>;
//  K 타입에서 T의 속성들을 제거하고 합침
