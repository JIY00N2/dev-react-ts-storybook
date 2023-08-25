// 복잡한 단축키 지원

import { useCallback, useEffect, useMemo } from 'react';

// enum
const ModifierBitMasks = {
  alt: 1,
  ctrl: 2,
  meta: 4,
  shift: 8,
} as const;

const ShiftKeys = {
  '~': '`',
  '!': '1',
  '@': '2',
  '#': '3',
  $: '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  _: '-',
  '+': '=',
  '{': '[',
  '}': ']',
  '|': '\\',
  ':': ';',
  '"': "'",
  '<': ',',
  '>': '.',
  '?': '/',
} as const;

const Aliases = {
  win: 'meta',
  window: 'meta',
  cmd: 'meta',
  command: 'meta',
  esc: 'escape',
  opt: 'alt',
  option: 'alt',
} as const;

function has<T extends object>(
  property: string | number | symbol,
  object: T
): property is keyof T {
  return property in object;
}

type KeyCombo = {
  modifiers: number;
  key: string;
};

type LocalHotKey = {
  global?: false;
  combo: string;
  onKeyDown?: (e: React.KeyboardEvent<Element> | KeyboardEvent) => void;
  onKeyUp?: (e: React.KeyboardEvent<Element> | KeyboardEvent) => void;
};

type GlobalHotKey = {
  global: true;
  combo: string;
  onKeyDown?: (e: React.KeyboardEvent<Element> | KeyboardEvent) => void;
  onKeyUp?: (e: React.KeyboardEvent<Element> | KeyboardEvent) => void;
};

type Hotkey = LocalHotKey | GlobalHotKey;
type Hotkeys = Hotkey[];

// React.KeyboardEvent<Element>: React 컴포넌트에서 이벤트를 다룰 때 주로 사용
// KeyboardEvent: 일반적인 JavaScript 이벤트에서 사용하는 타입
const getKeyCombo = (e: React.KeyboardEvent<Element> | KeyboardEvent) => {
  const key = e.key === ' ' ? 'space' : e.key.toLowerCase();

  console.log(key);

  let modifiers = 0; // ctrl, alt등
  // 비트 마스크(이진수를 사용하는 컴퓨터의 연산 방식)처럼 사용
  if (e.altKey) modifiers += ModifierBitMasks.alt;
  if (e.ctrlKey) modifiers += ModifierBitMasks.ctrl;
  if (e.metaKey) modifiers += ModifierBitMasks.meta;
  if (e.shiftKey) modifiers += ModifierBitMasks.shift;
  return { key, modifiers };
};

const parseKeyCombo = (combo: string) => {
  // 내가 입력한 값
  const pieces = combo.replace(/\s/g, '').toLowerCase().split('+');
  let modifiers = 0;
  let key = '';
  for (const piece of pieces) {
    if (has(piece, ModifierBitMasks)) {
      modifiers += ModifierBitMasks[piece];
    } else if (has(piece, ShiftKeys)) {
      modifiers += ModifierBitMasks.shift; // shift 추가
      key = ShiftKeys[piece]; // key = shift 하기 전 키
    } else if (has(piece, Aliases)) {
      key += Aliases[piece];
    } else {
      key = piece;
    }
  }
  return { modifiers, key };
};

// 콤보 매칭
const comboMatches = (a: KeyCombo, b: KeyCombo) => {
  return a.modifiers === b.modifiers && a.key === b.key;
};

// 글로벌 이벤트와 로컬 이벤트로 나눔
const useHotKey = (hotkeys: Hotkeys) => {
  const localKeys = useMemo(() => hotkeys.filter((k) => !k.global), [hotkeys]);
  const globalKeys = useMemo(() => hotkeys.filter((k) => k.global), [hotkeys]);

  // 두가지 이벤트를 공통으로 처리: 글로벌 여부, 단축키, 사용할 이벤트 이름, 이벤트 객체
  const invokeCallback = useCallback(
    (
      global: boolean,
      combo: KeyCombo,
      callbackName: 'onKeyDown' | 'onKeyUp',
      e: React.KeyboardEvent<Element> | KeyboardEvent
    ) => {
      for (const hotkey of global ? globalKeys : localKeys) {
        // hotkey를 통해 받은 combo parsing처리하고 콤보 매칭
        // 사용자가 입력한 키와 미리 적어둔 키가 같은지
        if (!comboMatches(parseKeyCombo(hotkey.combo), combo)) {
          return;
        }
        if (callbackName in hotkey) {
          hotkey['onKeyDown']!(e);
        }
        // 값이 있고, 같으면 함수 실행
        // hotkey[callbackName] &&
        //   (
        //     hotkey[callbackName] as (
        //       e: React.KeyboardEvent<Element> | KeyboardEvent
        //     ) => void
        //   )(e); // callbackName: onKeyDown, onKeyUp
      }
    },
    [localKeys, globalKeys]
  );

  // invokeCallback을 받아 줄 함수들 작성
  // 글로벌 처리 KeyDown
  const handleGlobalKeyDown = useCallback(
    (e: KeyboardEvent) => {
      invokeCallback(true, getKeyCombo(e), 'onKeyDown', e);
    },
    [invokeCallback]
  );
  // 글로벌 처리 KeyUp
  const handleGlobalKeyUp = useCallback(
    (e: KeyboardEvent) => {
      invokeCallback(true, getKeyCombo(e), 'onKeyUp', e);
    },
    [invokeCallback]
  );
  // 로컬 처리 KeyDown e.nativeEvent
  // e.nativeEvent는 React 이벤트 핸들러 함수 내에서 사용되는
  // React에서 이벤트 핸들러는 보통 이벤트 객체를 인자로 받음
  // 이벤트 객체에는 해당 이벤트에 관련된 정보와 속성들이 포함됨
  const handleLocalKeyDown = useCallback(
    (e: React.KeyboardEvent<Element>) => {
      invokeCallback(
        false,
        getKeyCombo(e.nativeEvent),
        'onKeyDown',
        e.nativeEvent
      );
    },
    [invokeCallback]
  );
  // 로컬 처리 KeyUp
  const handleLocalKeyUp = useCallback(
    (e: React.KeyboardEvent<Element>) => {
      invokeCallback(
        false,
        getKeyCombo(e.nativeEvent),
        'onKeyUp',
        e.nativeEvent
      );
    },
    [invokeCallback]
  );
  // 글로벌 처리
  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('keyup', handleGlobalKeyUp);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
      document.removeEventListener('keyup', handleGlobalKeyUp);
    };
  }, [handleGlobalKeyDown, handleGlobalKeyUp]);

  // 로컬은 사용자가 알아서 binding하도록 return
  return { handleKeyDown: handleLocalKeyDown, handleKeyUp: handleLocalKeyUp };
};

// const hotkeys = [
//   {
//     global: true,
//     combo: 'ctrl + k', // 단축키
//     onKeyDown: (e) => {
//       alert('ctrl + k');
//     },
//   },
// ];

// useHotKey(hotkeys);

export default useHotKey;
