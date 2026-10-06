import { FC } from "react";
import { IconButton, ListItemText, Tooltip } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";

import { lectureFileGetKind } from "shared/helpers";
import { useLectureFileGet } from "shared/hooks";

import { ILectureFiles } from "./lecture-files.types";
import {
  StyledList,
  StyledListItem,
  StyledPaper,
  StyledTitle,
} from "./lecture-files.styled";

const LectureFiles: FC<ILectureFiles> = ({
  lectureId,
  files,
  title,
  standalone,
}) => {
  const { getLectureFile, loading } = useLectureFileGet();

  if (!lectureId || !files?.length) {
    return null;
  }

  const handleDownload = async (
    fileId: string,
    fileName: string,
    homeWork?: boolean | null
  ) => {
    const blob = await getLectureFile(
      lectureId,
      fileId,
      lectureFileGetKind(homeWork) === "homework"
    );

    if (!blob) {
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const list = (
    <>
      {title ? <StyledTitle variant="subtitle1">{title}</StyledTitle> : null}
      <StyledList disablePadding>
        {files.map((file) => {
          const fileName = file.fileName || "Файл";

          return (
            <StyledListItem
              key={file.id}
              onClick={() => {
                if (!loading) handleDownload(file.id, fileName, file.homeWork);
              }}
            >
              <Tooltip title="Скачать">
                <span>
                  <IconButton
                    aria-label={`Скачать ${fileName}`}
                    disabled={loading}
                    size="small"
                    sx={{ p: 0.25, color: "primary.main" }}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <ListItemText
                primary={fileName}
                primaryTypographyProps={{
                  variant: "body2",
                  fontSize: 13,
                  noWrap: true,
                  title: fileName,
                }}
              />
            </StyledListItem>
          );
        })}
      </StyledList>
    </>
  );

  if (standalone) {
    return <StyledPaper>{list}</StyledPaper>;
  }

  return list;
};

export default LectureFiles;
