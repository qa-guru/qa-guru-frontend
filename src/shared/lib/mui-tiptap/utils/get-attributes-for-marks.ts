import { getMarkType } from "@tiptap/core";
import type { Mark, MarkType } from "@tiptap/pm/model";
import type { EditorState } from "@tiptap/pm/state";

export function getAttributesForMarks(
  state: EditorState,
  typeOrName: string | MarkType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any>[] {
  const type = getMarkType(typeOrName, state.schema);
  const { from, to, empty } = state.selection;
  const marks: Mark[] = [];

  if (empty) {
    if (state.storedMarks) {
      marks.push(...state.storedMarks);
    }

    marks.push(...state.selection.$head.marks());
  } else {
    state.doc.nodesBetween(from, to, (node) => {
      marks.push(...node.marks);
    });
  }

  return marks
    .filter((markItem) => markItem.type.name === type.name)
    .map((mark) => ({ ...mark.attrs }));
}
