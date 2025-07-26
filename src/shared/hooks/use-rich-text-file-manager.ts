import { useState } from "react";
import type { Node as ProseMirrorNode } from "prosemirror-model";

import { collectFileIds } from "shared/lib/mui-tiptap";
import { blobUrlToFile } from "shared/lib/mui-tiptap/utils/blob-url-to-file";
import { findNodeByUrl } from "shared/lib/mui-tiptap/utils/find-node-by-url";
import type { PendingFile } from "shared/components/text-editor/types";

interface UseFileManagerParams {
  upload: (file: File, entityId: string) => Promise<{ id: string }>;
  remove: (entityId: string, fileId: string) => Promise<void>;
  fileUrlBuilder: (fileId: string, entityId: string) => string;
  getEntityId: () => string;
}

export function useRichTextFileManager({
  upload,
  remove,
  fileUrlBuilder,
  getEntityId,
}: UseFileManagerParams) {
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);

  const extractBlobUrls = (html: string): string[] =>
    Array.from(html.matchAll(/(blob:[^"'\s>]+)/g)).map((m) => m[1]);

  const recoverMissingFiles = async (
    blobUrls: string[],
    doc: ProseMirrorNode
    // eslint-disable-next-line require-await
  ): Promise<PendingFile[]> => {
    const missing = blobUrls.filter(
      (url) => !pendingFiles.find((f) => f.localUrl === url)
    );

    return Promise.all(
      missing.map(async (url) => {
        const node = findNodeByUrl(doc, url);
        const file = await blobUrlToFile(url, node?.fileName || "recovered");
        return { file, localUrl: url };
      })
    );
  };

  const uploadAllFiles = async (
    allFiles: PendingFile[],
    html: string
  ): Promise<string> => {
    const entityId = getEntityId();

    const uploads = await Promise.all(
      allFiles.map(async ({ file, localUrl }) => {
        const uploaded = await upload(file, entityId);
        const realUrl = fileUrlBuilder(uploaded.id, entityId);
        return { localUrl, realUrl };
      })
    );

    let updatedHtml = html;
    uploads.forEach(({ localUrl, realUrl }) => {
      updatedHtml = updatedHtml.replaceAll(localUrl, realUrl);
    });

    return updatedHtml;
  };

  const removeDeletedFiles = async (doc: ProseMirrorNode) => {
    const entityId = getEntityId();
    const currentFileIds = collectFileIds(doc);

    const stillDeleted = deletedFileIds.filter(
      (id) => !currentFileIds.includes(id)
    );

    for (const id of stillDeleted) {
      await remove(entityId, id);
    }
  };

  const deleteFile = (fileId: string) => {
    if (fileId.startsWith("blob:")) {
      setPendingFiles((prev) => prev.filter((f) => f.localUrl !== fileId));
    } else {
      setDeletedFileIds((prev) => Array.from(new Set([...prev, fileId])));
    }
  };

  const resetState = () => {
    setPendingFiles([]);
    setDeletedFileIds([]);
  };

  return {
    pendingFiles,
    setPendingFiles,
    deletedFileIds,
    deleteFile,
    extractBlobUrls,
    recoverMissingFiles,
    uploadAllFiles,
    removeDeletedFiles,
    resetState,
  };
}
