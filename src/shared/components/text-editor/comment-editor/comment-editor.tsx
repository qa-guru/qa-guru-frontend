import {
  AttachFile,
  DeleteOutline,
  InsertDriveFileOutlined,
  Lock,
  LockOpen,
  TextFields,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import { FC, useCallback, useMemo, useRef, useState } from "react";

import { LinkBubbleMenu, RichTextEditor } from "shared/lib/mui-tiptap";
import { TableBubbleMenu, MenuButton } from "shared/lib/mui-tiptap/controls";

import { EditorMenuControls } from "./ui";
import { fileListToImageFiles } from "../utils/file-list-to-image-files";
import useExtensions from "../hooks/use-extensions";
import { ITextEditor } from "../types";
import {
  commentAttachmentId,
  formatAttachmentSize,
  splitCommentAttachments,
} from "../text-view/prepare-read-only-html";

const CommentEditor: FC<ITextEditor> = ({
  rteRef,
  content,
  setPendingFiles,
  source,
  handleDeleteFile,
  attachments = [],
  setAttachments,
  disabled = false,
}) => {
  const extensions = useExtensions({
    placeholder: "Введите текст...",
    onFileDelete: async (fileId: string) => {
      await handleDeleteFile?.(fileId);
    },
  });
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const body = useMemo(
    () => splitCommentAttachments(content ?? "").content,
    [content]
  );
  const locked = disabled || !isEditable;

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
    (files: File[]) => {
      if (!rteRef.current?.editor) return [];

      const filesWithUrl = files.map((file) => ({
        file,
        localUrl: URL.createObjectURL(file),
        source,
      }));

      setPendingFiles?.((prev) => [...prev, ...filesWithUrl]);

      return filesWithUrl.map(({ file, localUrl }) => ({
        src: localUrl,
        alt: file.name,
      }));
    },
    [rteRef, setPendingFiles]
  );

  const handleNewFiles = (files: File[]) => {
    if (locked || !setAttachments || !setPendingFiles) return;
    const filesWithUrl = files.map((file) => ({
      file,
      localUrl: URL.createObjectURL(file),
      source,
    }));
    setPendingFiles((prev) => [...prev, ...filesWithUrl]);
    setAttachments((prev) => [
      ...prev,
      ...filesWithUrl.map(({ file, localUrl }) => ({
        href: localUrl,
        fileName: file.name,
        size: file.size,
      })),
    ]);
  };

  const removeAttachment = (href: string) => {
    if (locked) return;
    setAttachments?.((prev) => prev.filter((file) => file.href !== href));
    const fileId = commentAttachmentId(href);
    if (fileId) handleDeleteFile?.(fileId);
  };

  return (
    <>
      <Box
        role="group"
        aria-label="Текст комментария"
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
          editable={!locked}
          content={body}
          editorProps={{
            handleDrop,
            handlePaste,
          }}
          renderControls={() => (
            <EditorMenuControls onUploadImageFiles={handleNewImageFiles} />
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
                  disabled={disabled}
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
      <Stack
        component="section"
        aria-label="Вложения"
        spacing={0.5}
        sx={{ mt: 1 }}
      >
        <Box>
          <Button
            size="small"
            startIcon={<AttachFile />}
            onClick={() => fileInputRef.current?.click()}
            disabled={locked || !setAttachments || !setPendingFiles}
          >
            Прикрепить файл
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            disabled={locked}
            onChange={(event) => {
              handleNewFiles(Array.from(event.target.files ?? []));
              event.target.value = "";
            }}
          />
        </Box>
        {attachments.length > 0 && (
          <List dense disablePadding aria-label="Прикреплённые файлы">
            {attachments.map(({ href, fileName, size }) => (
              <ListItem
                key={href}
                sx={{ px: 0, pr: 6, gap: 1, minWidth: 0 }}
                secondaryAction={
                  <IconButton
                    aria-label={`Удалить ${fileName}`}
                    size="small"
                    disabled={locked}
                    onClick={() => removeAttachment(href)}
                  >
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                }
              >
                <InsertDriveFileOutlined
                  color="primary"
                  fontSize="small"
                  sx={{ flexShrink: 0 }}
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography variant="body2" noWrap title={fileName}>
                    {fileName}
                  </Typography>
                  {size !== undefined && (
                    <Typography variant="caption" color="text.secondary">
                      {formatAttachmentSize(size)}
                    </Typography>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </>
  );
};

export default CommentEditor;
