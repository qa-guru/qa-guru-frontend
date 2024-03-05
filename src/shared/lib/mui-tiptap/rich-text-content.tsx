import { Box } from "@mui/material";
import { EditorContent } from "@tiptap/react";
import { useMemo } from "react";
import type { CSSObject } from "tss-react";
import { makeStyles } from "tss-react/mui";

import { useRichTextEditorContext } from "./context";
import { getEditorStyles, getUtilityClasses } from "./styles";

export type RichTextContentClasses = ReturnType<typeof useStyles>["classes"];

export type RichTextContentProps = {
  className?: string;
  classes?: Partial<RichTextContentClasses>;
};

const richTextContentClasses: RichTextContentClasses = getUtilityClasses(
  "RichTextContent",
  ["root", "readonly", "editable"]
);

const useStyles = makeStyles({ name: { RichTextContent } })((theme) => {
  return {
    root: {
      "& .ProseMirror": {
        ...getEditorStyles(theme),
      } as CSSObject,
    },

    readonly: {},

    editable: {},
  };
});

export default function RichTextContent({
  className,
  classes: overrideClasses = {},
}: RichTextContentProps) {
  const { classes, cx } = useStyles(undefined, {
    props: { classes: overrideClasses },
  });
  const editor = useRichTextEditorContext();
  const editorClasses = useMemo(
    () =>
      cx(
        richTextContentClasses.root,
        className,
        classes.root,
        editor?.isEditable
          ? [richTextContentClasses.editable, classes.editable]
          : [richTextContentClasses.readonly, classes.readonly]
      ),
    [className, classes, cx, editor?.isEditable]
  );

  return (
    <Box className={editorClasses} component={EditorContent} editor={editor} />
  );
}
