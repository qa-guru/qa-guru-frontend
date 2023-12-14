import { getSchemaTypeNameByName } from "@tiptap/core";
import type { MarkType, NodeType } from "@tiptap/pm/model";
import type { EditorState } from "@tiptap/pm/state";

import { getAttributesForMarks } from "./get-attributes-for-marks";
import { getAttributesForNodes } from "./get-attributes-for-nodes";

export function getAttributesForEachSelected(
  state: EditorState,
  typeOrName: string | NodeType | MarkType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any>[] {
  const schemaType = getSchemaTypeNameByName(
    typeof typeOrName === "string" ? typeOrName : typeOrName.name,
    state.schema
  );

  if (schemaType === "node") {
    return getAttributesForNodes(state, typeOrName as NodeType);
  }

  if (schemaType === "mark") {
    return getAttributesForMarks(state, typeOrName as MarkType);
  }

  return [];
}
