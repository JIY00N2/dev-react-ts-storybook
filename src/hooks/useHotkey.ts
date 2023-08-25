import { useCallback, useEffect, useMemo } from 'react';

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
export type Hotkeys = Hotkey[];

type KeyCombo = {
  modifiers: number;
  key: string;
};

function has<T extends object>(
  property: string | number | symbol,
  object: T
): property is keyof T {
  return property in object;
}

const MODIFIERS_BIT_MASKS = {
  alt: 1,
  ctrl: 2,
  meta: 4,
  shift: 8,
} as const;

const SHIFT_KEYS = {
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

const KEY_ALIASES = {
  win: 'meta',
  window: 'meta',
  cmd: 'meta',
  command: 'meta',
  opt: 'alt',
  option: 'alt',
} as const;

const getKeyCombo = (
  e: React.KeyboardEvent<Element> | KeyboardEvent
): KeyCombo => {
  const key = e.key === ' ' ? 'space' : e.key.toLowerCase();

  let modifiers = 0;
  if (e.altKey) modifiers += MODIFIERS_BIT_MASKS.alt;
  if (e.ctrlKey) modifiers += MODIFIERS_BIT_MASKS.ctrl;
  if (e.metaKey) modifiers += MODIFIERS_BIT_MASKS.meta;
  if (e.shiftKey) modifiers += MODIFIERS_BIT_MASKS.shift;

  return { modifiers, key };
};

const parseKeyCombo = (combo: string): KeyCombo => {
  const pieces = combo.replace(/\s/g, '').toLowerCase().split('+');
  let modifiers = 0;
  let key = '';

  for (const piece of pieces) {
    if (has(piece, MODIFIERS_BIT_MASKS)) {
      modifiers += MODIFIERS_BIT_MASKS[piece];
    } else if (has(piece, SHIFT_KEYS)) {
      modifiers += MODIFIERS_BIT_MASKS.shift;
      key = SHIFT_KEYS[piece];
    } else if (has(piece, KEY_ALIASES)) {
      modifiers += MODIFIERS_BIT_MASKS[KEY_ALIASES[piece]];
    } else {
      key = piece;
    }
  }

  return { modifiers, key };
};

const comboMatches = (a: KeyCombo, b: KeyCombo) => {
  return a.modifiers === b.modifiers && a.key === b.key;
};

const useHotkey = (hotkeys: Hotkeys) => {
  const localKeys = useMemo(
    () => hotkeys.filter((hotkey): hotkey is LocalHotKey => !hotkey.global),
    [hotkeys]
  );
  const globalKeys = useMemo(
    () => hotkeys.filter((hotkey): hotkey is GlobalHotKey => !!hotkey.global),
    [hotkeys]
  );

  const invokeCallback = useCallback(
    (
      global: boolean,
      combo: KeyCombo,
      callbackName: 'onKeyDown' | 'onKeyUp',
      e: React.KeyboardEvent<Element> | KeyboardEvent
    ) => {
      for (const hotkey of global ? globalKeys : localKeys) {
        if (!comboMatches(parseKeyCombo(hotkey.combo), combo)) {
          return;
        }
        if (callbackName in hotkey) {
          hotkey['onKeyDown']!(e);
        }
      }
    },
    [globalKeys, localKeys]
  );

  const handleGlobalKeyDown = useCallback(
    (e: KeyboardEvent) => {
      invokeCallback(true, getKeyCombo(e), 'onKeyDown', e);
    },
    [invokeCallback]
  );

  const handleGlobalKeyUp = useCallback(
    (e: KeyboardEvent) => {
      invokeCallback(true, getKeyCombo(e), 'onKeyUp', e);
    },
    [invokeCallback]
  );

  const handleLocalKeyDown = useCallback(
    (e: React.KeyboardEvent<Element>) => {
      invokeCallback(false, getKeyCombo(e), 'onKeyDown', e.nativeEvent);
    },
    [invokeCallback]
  );

  const handleLocalKeyUp = useCallback(
    (e: React.KeyboardEvent<Element>) => {
      invokeCallback(false, getKeyCombo(e), 'onKeyUp', e.nativeEvent);
    },
    [invokeCallback]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('keyup', handleGlobalKeyUp);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
      document.removeEventListener('keyup', handleGlobalKeyUp);
    };
  }, [handleGlobalKeyDown, handleGlobalKeyUp]);

  return {
    handleKeyDown: handleLocalKeyDown,
    handleKeyUp: handleLocalKeyUp,
  };
};

export default useHotkey;
