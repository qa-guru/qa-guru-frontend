export type VideoHost = "youtube" | "rutube";

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

const RUTUBE_HOSTS = new Set(["rutube.ru", "www.rutube.ru"]);

export function unescapeHtmlAttr(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function parseHttpUrl(src: string): URL | null {
  try {
    const url = new URL(src.trim());

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

export function classifyVideoSrc(
  src: string | null | undefined
): VideoHost | null {
  if (!src) {
    return null;
  }

  const url = parseHttpUrl(unescapeHtmlAttr(src));

  if (!url) {
    return null;
  }

  const { hostname, pathname } = url;

  if (YOUTUBE_HOSTS.has(hostname.toLowerCase()) && pathname.includes("/embed/")) {
    return "youtube";
  }

  if (
    RUTUBE_HOSTS.has(hostname.toLowerCase()) &&
    pathname.includes("/play/embed")
  ) {
    return "rutube";
  }

  return null;
}

export function allowedVideoSrc(
  src: string | null | undefined
): string | null {
  if (!src) {
    return null;
  }

  const decoded = unescapeHtmlAttr(src).trim();

  if (!classifyVideoSrc(decoded)) {
    return null;
  }

  return decoded;
}

export function resolveVideoHost(
  youtube: string | null,
  rutube: string | null,
  pref: VideoHost | null
): VideoHost | null {
  if (pref === "youtube" && youtube) {
    return "youtube";
  }

  if (pref === "rutube" && rutube) {
    return "rutube";
  }

  if (youtube) {
    return "youtube";
  }

  if (rutube) {
    return "rutube";
  }

  return null;
}

export function videoEmbedTag(parts: {
  youtube?: string;
  rutube?: string;
}): string {
  const attrs: string[] = [];

  if (parts.youtube) {
    attrs.push(`youtube="${escapeHtmlAttr(parts.youtube)}"`);
  }

  if (parts.rutube) {
    attrs.push(`rutube="${escapeHtmlAttr(parts.rutube)}"`);
  }

  if (attrs.length === 0) {
    return "";
  }

  return `<video-embed ${attrs.join(" ")}></video-embed>`;
}
