import { Button, DialogActions, TextField, Typography } from "@mui/material";
import { getMarkRange, getMarkType, type Editor } from "@tiptap/core";
import encodeurl from "encodeurl";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Maybe } from "api/graphql/generated/graphql";
import useOutsideClick from "shared/hooks/use-outside-click";

import useKeyDown from "../../hooks/use-key-down";

export type EditLinkMenuContentProps = {
  editor: Editor;
  onCancel: () => void;
  onSave: ({ text, link }: { text: string; link: string }) => void;
  labels?: {
    editLinkAddTitle?: ReactNode;
    editLinkEditTitle?: ReactNode;
    editLinkTextInputLabel?: ReactNode;
    editLinkHrefInputLabel?: ReactNode;
    editLinkCancelButtonLabel?: ReactNode;
    editLinkSaveButtonLabel?: ReactNode;
  };
};

export default function EditLinkMenuContent({
  editor,
  onCancel,
  onSave,
  labels,
}: EditLinkMenuContentProps) {
  const existingHref = editor.isActive("link")
    ? (editor.getAttributes("link").href as string)
    : "";
  const linkRange = getMarkRange(
    editor.state.selection.$from,
    getMarkType("link", editor.schema)
  );
  const linkText = linkRange
    ? editor.state.doc.textBetween(linkRange.from, linkRange.to)
    : "";

  const selectedText = editor.state.doc.textBetween(
    editor.state.selection.$from.pos,
    editor.state.selection.$to.pos
  );

  const initialText = linkText || selectedText;

  const [textValue, setTextValue] = useState(initialText);
  const [hrefValue, setHrefValue] = useState(existingHref);

  const textRef = useRef<Maybe<HTMLInputElement>>(null);
  const hrefRef = useRef<Maybe<HTMLInputElement>>(null);

  const isNewLink = !existingHref;
  const addLinkTitle = labels?.editLinkAddTitle ?? "Add link";
  const editLinkTitle = labels?.editLinkEditTitle ?? "Edit link";
  const editMenuTitle = isNewLink ? addLinkTitle : editLinkTitle;

  useEffect(() => {
    const autoFocusOnTextInput = !isNewLink || !initialText;
    if (autoFocusOnTextInput) {
      textRef.current?.focus();
    } else {
      hrefRef.current?.focus();
    }
  }, [isNewLink, initialText]);

  useKeyDown("Escape", onCancel);

  const formatHref = useCallback(() => {
    if (!hrefRef.current) {
      return;
    }

    let currentHrefValue = hrefRef.current.value.trim();
    if (
      currentHrefValue &&
      !currentHrefValue.startsWith("http://") &&
      !currentHrefValue.startsWith("https://") &&
      !currentHrefValue.startsWith("mailto:") &&
      !currentHrefValue.startsWith("tel:")
    ) {
      currentHrefValue = `http://${currentHrefValue}`;
    }

    setHrefValue(encodeurl(currentHrefValue));
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);
  useOutsideClick(formRef, onCancel);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        event.stopPropagation();

        setIsSubmitting(true);
        const text = textRef.current?.value ?? "";
        const href = hrefRef.current?.value ?? "";
        onSave({ text, link: href });
        setIsSubmitting(false);
      }}
      autoComplete="off"
      ref={formRef}
    >
      <Typography variant="h6">{editMenuTitle}</Typography>

      <TextField
        inputRef={textRef}
        value={textValue}
        disabled={isSubmitting}
        onChange={(event) => setTextValue(event.target.value)}
        label={labels?.editLinkTextInputLabel ?? "Text"}
        margin="normal"
        size="small"
        fullWidth
        required
      />

      <TextField
        inputRef={hrefRef}
        value={hrefValue}
        onChange={(event) => setHrefValue(event.target.value)}
        disabled={isSubmitting}
        label={labels?.editLinkHrefInputLabel ?? "Link"}
        margin="dense"
        size="small"
        type="url"
        onBlur={formatHref}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            formatHref();
          }
        }}
        fullWidth
        required
      />

      <DialogActions sx={{ px: 0 }}>
        <Button
          onClick={onCancel}
          color="secondary"
          variant="contained"
          size="small"
        >
          {labels?.editLinkCancelButtonLabel ?? "Cancel"}
        </Button>

        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={isSubmitting}
          style={{ color: "white" }}
        >
          {labels?.editLinkSaveButtonLabel ?? "Save"}
        </Button>
      </DialogActions>
    </form>
  );
}
