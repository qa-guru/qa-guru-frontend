import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
import { FC, useCallback, useState } from "react";

import {
  insertFiles,
  insertImages,
  LinkBubbleMenu,
  RichTextEditor,
} from "shared/lib/mui-tiptap";
import { TableBubbleMenu, MenuButton } from "shared/lib/mui-tiptap/controls";
import { extractFileId } from "shared/helpers";

import { EditorMenuControls } from "./ui";
import { fileListToImageFiles } from "../utils/file-list-to-image-files";
import useExtensions from "../hooks/use-extensions";
import { ITextEditor } from "../types";

const CommentEditor: FC<ITextEditor> = ({
  rteRef,
  content,
  setPendingFiles,
  source,
  handleDeleteFile,
}) => {
  const extensions = useExtensions({
    placeholder: "Введите текст...",
  });
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
    useCallback((view, event, _slice, _moved) => {
      if (!(event instanceof DragEvent) || !event.dataTransfer) {
        return false;
      }

      const imageFiles = fileListToImageFiles(event.dataTransfer.files);
      if (imageFiles.length > 0) {
        event.preventDefault();
        return true;
      }

      return false;
    }, []);

  const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> =
    useCallback((_view, event, _slice) => {
      if (!event.clipboardData) {
        return false;
      }

      const pastedImageFiles = fileListToImageFiles(event.clipboardData.files);
      return pastedImageFiles.length > 0;
    }, []);

  const handleNewImageFiles = useCallback(
    (files: File[], insertPosition?: number): void => {
      if (!rteRef.current?.editor) return;

      const filesWithUrl = files.map((file) => ({
        file,
        localUrl: URL.createObjectURL(file),
        source,
      }));

      setPendingFiles?.((prev) => [...prev, ...filesWithUrl]);

      const attributesForImageFiles = filesWithUrl.map(
        ({ file, localUrl }) => ({
          src: localUrl,
          alt: file.name,
        })
      );

      insertImages({
        images: attributesForImageFiles,
        editor: rteRef.current.editor,
        position: insertPosition,
      });
    },
    [rteRef, setPendingFiles]
  );

  const handleNewFiles = useCallback(
    (files: File[], insertPosition?: number): void => {
      if (!rteRef.current?.editor) {
        return;
      }

      const filesWithUrl = files.map((file) => ({
        file,
        localUrl: URL.createObjectURL(file),
        source,
      }));

      setPendingFiles?.((prev) => [...prev, ...filesWithUrl]);

      const attributesForFiles = filesWithUrl.map(({ localUrl, file }) => ({
        href: localUrl,
        fileName: file.name,
      }));

      insertFiles({
        files: attributesForFiles,
        editor: rteRef.current.editor,
        position: insertPosition,
      });
    },
    [rteRef, setPendingFiles]
  );

  const handleKeyDown = useCallback(
    (view: EditorView, event: { key: string }) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        const content = rteRef.current?.editor?.getHTML();

        if (content) {
          const fileIds = extractFileId(content);

          if (fileIds.length > 0) {
            handleDeleteFile?.(content);
          }
        }
      }

      return false;
    },
    [handleDeleteFile]
  );

  return (
    <>
      <Box
        sx={{
          "& .ProseMirror": {
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              scrollMarginTop: showMenuBar ? 50 : 0,
            },
          },
        }}
      >
        <RichTextEditor
          ref={rteRef}
          extensions={extensions}
          editable={isEditable}
          content={content}
          editorProps={{
            handleDrop,
            handlePaste,
            handleDOMEvents: {
              keydown: handleKeyDown,
            },
          }}
          renderControls={() => (
            <EditorMenuControls
              onUploadImageFiles={handleNewImageFiles}
              onUploadFiles={handleNewFiles}
            />
          )}
          RichTextFieldProps={{
            variant: "outlined",
            MenuBarProps: {
              hide: !showMenuBar,
            },
            footer: (
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  borderTopStyle: "solid",
                  borderTopWidth: 1,
                  borderTopColor: (theme) => theme.palette.divider,
                  py: 1,
                  px: 1.5,
                }}
              >
                <MenuButton
                  value="formatting"
                  tooltipLabel={
                    showMenuBar ? "Hide formatting" : "Show formatting"
                  }
                  size="small"
                  onClick={() =>
                    setShowMenuBar((currentState) => !currentState)
                  }
                  selected={showMenuBar}
                  IconComponent={TextFields}
                />

                <MenuButton
                  value="formatting"
                  tooltipLabel={
                    isEditable
                      ? "Prevent edits (use read-only mode)"
                      : "Allow edits"
                  }
                  size="small"
                  onClick={() => setIsEditable((currentState) => !currentState)}
                  selected={!isEditable}
                  IconComponent={isEditable ? Lock : LockOpen}
                />
              </Stack>
            ),
          }}
        >
          {() => (
            <>
              <LinkBubbleMenu />
              <TableBubbleMenu />
            </>
          )}
        </RichTextEditor>
      </Box>
    </>
  );
};

export default CommentEditor;
