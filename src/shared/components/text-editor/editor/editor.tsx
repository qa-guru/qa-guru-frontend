import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import { FC, useCallback, useState } from "react";
import { useSnackbar } from "notistack";

import { insertFiles, insertImages } from "shared/lib/mui-tiptap/utils";
import { LinkBubbleMenu, RichTextEditor } from "shared/lib/mui-tiptap";
import { TableBubbleMenu, MenuButton } from "shared/lib/mui-tiptap/controls";

import { EditorMenuControls } from "./ui";
import { ITextEditor } from "../types";
import useExtensions from "../hooks/use-extensions";
import { fileListToImageFiles } from "../utils/file-list-to-image-files";
import { useHomeworkFileUpload } from "../hooks/use-homework-file-upload";

const Editor: FC<ITextEditor> = ({ rteRef, content, homeWorkId }) => {
  const extensions = useExtensions({
    placeholder: "Введите текст...",
  });
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const { uploadHomeworkFile } = useHomeworkFileUpload();
  const { enqueueSnackbar } = useSnackbar();

  const baseUrl = import.meta.env.VITE_APP_ENDPOINT;

  const handleNewImageFiles = useCallback(
    async (files: File[], insertPosition?: number): Promise<void> => {
      if (!rteRef.current?.editor || !homeWorkId) {
        return;
      }

      const attributesForImageFiles = await Promise.all(
        files.map(async (file) => {
          try {
            const uploadedFile = await uploadHomeworkFile(file, homeWorkId);

            if (uploadedFile) {
              const serverUrl = `${baseUrl}/homework/${homeWorkId}/file/${uploadedFile.id}`;

              return {
                src: serverUrl,
                alt: uploadedFile.fileName,
              };
            }
          } catch {
            enqueueSnackbar(`Не удалось загрузить файл: ${file.name}`, {
              variant: "error",
            });
          }

          return {
            src: "",
            alt: file.name,
          };
        })
      );

      insertImages({
        images: attributesForImageFiles.filter((img) => img.src),
        editor: rteRef.current.editor,
        position: insertPosition,
      });
    },
    [rteRef, homeWorkId, uploadHomeworkFile]
  );

  const handleNewFiles = useCallback(
    async (files: File[], insertPosition?: number): Promise<void> => {
      if (!rteRef.current?.editor || !homeWorkId) {
        return;
      }

      const attributesForFiles = await Promise.all(
        files.map(async (file) => {
          try {
            const uploadedFile = await uploadHomeworkFile(file, homeWorkId);

            if (uploadedFile) {
              const serverUrl = `/homework/${homeWorkId}/file/${uploadedFile.id}`;

              return {
                href: serverUrl,
                fileName: uploadedFile.fileName,
              };
            }
          } catch {
            enqueueSnackbar(`Не удалось загрузить файл: ${file.name}`, {
              variant: "error",
            });
          }

          return {
            href: "",
            fileName: file.name,
          };
        })
      );

      insertFiles({
        files: attributesForFiles.filter((file) => file.href),
        editor: rteRef.current.editor,
        position: insertPosition,
      });
    },
    [rteRef, homeWorkId, uploadHomeworkFile, enqueueSnackbar]
  );

  const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
    useCallback(
      (view, event, _slice, _moved) => {
        if (!(event instanceof DragEvent) || !event.dataTransfer) {
          return false;
        }

        const imageFiles = fileListToImageFiles(event.dataTransfer.files);
        const files = Array.from(event.dataTransfer.files);

        if (imageFiles.length > 0) {
          const insertPosition = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })?.pos;

          handleNewImageFiles(imageFiles, insertPosition);
        } else if (files.length > 0) {
          const insertPosition = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })?.pos;

          handleNewFiles(files, insertPosition);
        }

        event.preventDefault();
        return true;
      },
      [handleNewImageFiles, handleNewFiles]
    );

  const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> =
    useCallback(
      (_view, event, _slice) => {
        if (!event.clipboardData) {
          return false;
        }
        const pastedFiles = Array.from(event.clipboardData.files);
        const pastedImageFiles = fileListToImageFiles(
          event.clipboardData.files
        );

        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);
        } else if (pastedFiles.length > 0) {
          handleNewFiles(pastedFiles);
        }

        return false;
      },
      [handleNewImageFiles, handleNewFiles]
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
          }}
          renderControls={() => (
            <EditorMenuControls
              homeWorkId={homeWorkId}
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

export default Editor;
