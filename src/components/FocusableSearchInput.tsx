import React, {useImperativeHandle, useRef} from 'react';
import {TextInput, TextInputProps} from 'react-native';

export type FocusableSearchInputHandle = {
  focus: () => void;
  clear: () => void;
};

type Props = TextInputProps & {
  ref?: React.Ref<FocusableSearchInputHandle | null>;
};

/**
 * Parent gets ref.current = { focus, clear }, not the raw TextInput.
 * useImperativeHandle defines what the parent sees when it uses the ref.
 */
export function FocusableSearchInput({ref: refProp, ...props}: Props) {
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(
    refProp,
    () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => inputRef.current?.clear(),
    }),
    [],
  );

  return <TextInput ref={inputRef} {...props} />;
}
