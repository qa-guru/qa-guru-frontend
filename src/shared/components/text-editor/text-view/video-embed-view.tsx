import { NodeViewWrapper } from "@tiptap/react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCallback, useSyncExternalStore } from "react";

import {
  allowedVideoSrc,
  resolveVideoHost,
  type VideoHost,
} from "./video-src";

const STORAGE_PREFIX = "qaguru.videoHost:";
const listeners = new Set<() => void>();

function documentStorageKey(): string {
  if (typeof window === "undefined") {
    return STORAGE_PREFIX;
  }

  return `${STORAGE_PREFIX}${window.location.pathname}`;
}

function emitVideoHostPref(): void {
  listeners.forEach((listener) => listener());
}

function subscribeVideoHostPref(listener: () => void): () => void {
  listeners.add(listener);

  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }

  return () => {
    listeners.delete(listener);

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
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
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(documentStorageKey(), host);
    } catch {
      // private mode / quota
    }
  }

  emitVideoHostPref();
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
  const pref = useSyncExternalStore(
    subscribeVideoHostPref,
    readVideoHostPref,
    () => null
  );
  const host = resolveVideoHost(youtube, rutube, pref);
  const src = srcForHost(host, youtube, rutube);

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

      writeVideoHostPref(next);
    },
    [youtube, rutube]
  );

  return (
    <NodeViewWrapper
      as="div"
      className="iframe-container"
      contentEditable={false}
    >
      {youtube || rutube ? (
        <ToggleButtonGroup
          exclusive
          size="small"
          value={host}
          onChange={handleChange}
          onMouseDown={(event) => event.preventDefault()}
          aria-label="Источник видео"
          sx={{ mb: 1, maxWidth: 640 }}
        >
          {youtube ? (
            <ToggleButton value="youtube">YouTube</ToggleButton>
          ) : null}
          {rutube ? <ToggleButton value="rutube">Rutube</ToggleButton> : null}
        </ToggleButtonGroup>
      ) : null}
      {src ? (
        <iframe
          key={src}
          src={src}
          title={host === "rutube" ? "Rutube" : "YouTube"}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : null}
    </NodeViewWrapper>
  );
}

export default VideoEmbedView;
