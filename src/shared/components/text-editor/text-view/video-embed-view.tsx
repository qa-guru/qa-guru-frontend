import { NodeViewWrapper } from "@tiptap/react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCallback, useState } from "react";

import {
  allowedVideoSrc,
  resolveVideoHost,
  type VideoHost,
} from "./video-src";

const STORAGE_PREFIX = "qaguru.videoHost:";

function documentStorageKey(): string {
  if (typeof window === "undefined") {
    return STORAGE_PREFIX;
  }

  return `${STORAGE_PREFIX}${window.location.pathname}`;
}

function readVideoHostPref(): VideoHost | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(documentStorageKey());

    if (value === "youtube" || value === "rutube") {
      return value;
    }
  } catch {
    return null;
  }

  return null;
}

function writeVideoHostPref(host: VideoHost): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(documentStorageKey(), host);
  } catch {
    // private mode / quota
  }
}

function srcForHost(
  host: VideoHost | null,
  youtube: string | null,
  rutube: string | null
): string | null {
  if (host === "youtube") {
    return youtube;
  }

  if (host === "rutube") {
    return rutube;
  }

  return null;
}

interface VideoEmbedViewProps {
  node: {
    attrs: {
      youtube?: string | null;
      rutube?: string | null;
    };
  };
}

function VideoEmbedView({ node }: VideoEmbedViewProps) {
  const youtube = allowedVideoSrc(node.attrs.youtube);
  const rutube = allowedVideoSrc(node.attrs.rutube);
  const [host, setHost] = useState<VideoHost | null>(() =>
    resolveVideoHost(youtube, rutube, readVideoHostPref())
  );
  const src = srcForHost(host, youtube, rutube);
  const showSwitch = Boolean(youtube && rutube);

  const handleChange = useCallback(
    (_event: unknown, next: VideoHost | null) => {
      if (!next) {
        return;
      }

      if (next === "youtube" && !youtube) {
        return;
      }

      if (next === "rutube" && !rutube) {
        return;
      }

      setHost(next);
      writeVideoHostPref(next);
    },
    [youtube, rutube]
  );

  return (
    <NodeViewWrapper as="div" contentEditable={false}>
      <Box sx={{ maxWidth: 640, my: 1 }}>
        {showSwitch ? (
          <ToggleButtonGroup
            exclusive
            size="small"
            value={host}
            onChange={handleChange}
            onMouseDown={(event) => event.preventDefault()}
            aria-label="Источник видео"
            sx={{ mb: 1 }}
          >
            <ToggleButton value="youtube">YouTube</ToggleButton>
            <ToggleButton value="rutube">Rutube</ToggleButton>
          </ToggleButtonGroup>
        ) : null}
        {src ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              bgcolor: "common.black",
            }}
          >
            <iframe
              key={src}
              src={src}
              title={host === "rutube" ? "Rutube" : "YouTube"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          </Box>
        ) : null}
      </Box>
    </NodeViewWrapper>
  );
}

export default VideoEmbedView;
