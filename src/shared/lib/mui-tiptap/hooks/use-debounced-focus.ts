import type { Editor } from "@tiptap/core";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";
import { Maybe } from "api/graphql/generated/graphql";

export type UseDebouncedFocusOptions = {
  editor: Maybe<Editor>;
  wait?: number;
};

export default function useDebouncedFocus({
  editor,
  wait = 250,
}: UseDebouncedFocusOptions): boolean {
  const [isFocusedDebounced, setIsFocusedDebounced] = useState(
    !!editor?.isFocused
  );

  const updateIsFocusedDebounced = useMemo(
    () => debounce((focused: boolean) => setIsFocusedDebounced(focused), wait),
    [wait]
  );

  useEffect(() => {
    const isFocused = !!editor?.isFocused;
    updateIsFocusedDebounced(isFocused);

    if (isFocused) {
      updateIsFocusedDebounced.flush();
    }

    return () => {
      updateIsFocusedDebounced.cancel();
    };
  }, [editor?.isFocused, updateIsFocusedDebounced]);

  return isFocusedDebounced;
}
