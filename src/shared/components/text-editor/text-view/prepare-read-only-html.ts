import {
  classifyVideoSrc,
  type VideoHost,
  unescapeHtmlAttr,
  videoEmbedTag,
} from "./video-src";

const FILES_TABLE_RE =
  /<table\b[^>]*\bfiles-table\b[^>]*>[\s\S]*?<\/table>/gi;
const MIME_ICON_IMG_RE =
  /<img\b[^>]*\/public\/mimetypes\/[^"'>\s]*-icon-[^"'>\s]*\.png[^>]*>/gi;
const IFRAME_RE = /<iframe\b[^>]*>(?:\s*<\/iframe>)?/gi;
const LT_BLOCK_OPEN_RE = /<div\b[^>]*\blt-block(?!-)[^>]*>/gi;

type IframeHost = VideoHost | "other";

type IframeHit = {
  start: number;
  end: number;
  src: string;
  host: IframeHost;
};

type Replacement = {
  start: number;
  end: number;
  html: string;
};

function stripFilesTableMimeIcons(html: string): string {
  return html.replace(FILES_TABLE_RE, (tableHtml) =>
    tableHtml.replace(MIME_ICON_IMG_RE, "")
  );
}

function iframeSrc(tag: string): string | null {
  const match = /\bsrc\s*=\s*("([^"]*)"|'([^']*)')/i.exec(tag);

  if (!match) {
    return null;
  }

  const raw = match[2] ?? match[3] ?? "";
  const decoded = unescapeHtmlAttr(raw).trim();

  return decoded || null;
}

function findIframes(html: string): IframeHit[] {
  const hits: IframeHit[] = [];
  const iframeRe = new RegExp(IFRAME_RE.source, "gi");
  let match = iframeRe.exec(html);

  while (match) {
    const tag = match[0];
    const src = iframeSrc(tag);
    const host = classifyVideoSrc(src) ?? "other";

    hits.push({
      start: match.index,
      end: match.index + tag.length,
      src: src ?? "",
      host,
    });
    match = iframeRe.exec(html);
  }

  return hits;
}

function isGlue(between: string): boolean {
  const withoutNoise = between
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, "")
    .replace(/&#160;/gi, "")
    .replace(/\s+/g, "");

  return withoutNoise.length === 0;
}

function skipStyleOrScript(html: string, index: number): number | null {
  const rest = html.slice(index, index + 8).toLowerCase();

  if (rest.startsWith("<style")) {
    const close = html.toLowerCase().indexOf("</style>", index);

    return close < 0 ? html.length : close + 8;
  }

  if (rest.startsWith("<script")) {
    const close = html.toLowerCase().indexOf("</script>", index);

    return close < 0 ? html.length : close + 9;
  }

  return null;
}

function findMatchingDivEnd(html: string, openStart: number): number {
  const openTagEnd = html.indexOf(">", openStart);

  if (openTagEnd < 0) {
    return -1;
  }

  let index = openTagEnd + 1;
  let depth = 1;

  while (index < html.length && depth > 0) {
    const skipped = skipStyleOrScript(html, index);

    if (skipped !== null) {
      index = skipped;
      continue;
    }

    const next = html.slice(index, index + 6).toLowerCase();

    if (next.startsWith("<div")) {
      const tagEnd = html.indexOf(">", index);

      if (tagEnd < 0) {
        return -1;
      }

      depth += 1;
      index = tagEnd + 1;
      continue;
    }

    if (next.startsWith("</div>")) {
      depth -= 1;
      index += 6;

      if (depth === 0) {
        return index;
      }

      continue;
    }

    index += 1;
  }

  return -1;
}

function findEnclosingLtBlock(
  html: string,
  pos: number
): { start: number; end: number } | null {
  const before = html.slice(0, pos);
  const openRe = new RegExp(LT_BLOCK_OPEN_RE.source, "gi");
  let last: RegExpExecArray | null = null;
  let match = openRe.exec(before);

  while (match) {
    last = match;
    match = openRe.exec(before);
  }

  if (!last) {
    return null;
  }

  const end = findMatchingDivEnd(html, last.index);

  if (end < pos) {
    return null;
  }

  return { start: last.index, end };
}

function canPair(
  current: IframeHit,
  next: IframeHit | undefined,
  html: string
): next is IframeHit {
  if (!next) {
    return false;
  }

  if (current.host === "other" || next.host === "other") {
    return false;
  }

  if (current.host === next.host) {
    return false;
  }

  return isGlue(html.slice(current.end, next.start));
}

function tagForSingle(hit: IframeHit): string {
  if (hit.host === "other") {
    return "";
  }

  if (hit.host === "youtube") {
    return videoEmbedTag({ youtube: hit.src });
  }

  return videoEmbedTag({ rutube: hit.src });
}

function pairTag(first: IframeHit, second: IframeHit): string {
  const youtube = first.host === "youtube" ? first.src : second.src;
  const rutube = first.host === "rutube" ? first.src : second.src;

  return videoEmbedTag({ youtube, rutube });
}

function pushPairReplacements(
  html: string,
  first: IframeHit,
  second: IframeHit,
  replacements: Replacement[]
): void {
  replacements.push({
    start: first.start,
    end: first.end,
    html: pairTag(first, second),
  });

  const firstBlock = findEnclosingLtBlock(html, first.start);
  const secondBlock = findEnclosingLtBlock(html, second.start);

  if (secondBlock && firstBlock?.start !== secondBlock.start) {
    replacements.push({
      start: secondBlock.start,
      end: secondBlock.end,
      html: "",
    });

    return;
  }

  replacements.push({
    start: second.start,
    end: second.end,
    html: "",
  });
}

function collectReplacements(html: string, hits: IframeHit[]): Replacement[] {
  const replacements: Replacement[] = [];
  let index = 0;

  while (index < hits.length) {
    const current = hits[index];
    const next = hits[index + 1];

    if (canPair(current, next, html)) {
      pushPairReplacements(html, current, next, replacements);
      index += 2;
      continue;
    }

    replacements.push({
      start: current.start,
      end: current.end,
      html: tagForSingle(current),
    });
    index += 1;
  }

  return replacements;
}

function applyReplacements(html: string, replacements: Replacement[]): string {
  const ordered = [...replacements].sort((left, right) => right.start - left.start);
  let result = html;

  for (const item of ordered) {
    result = `${result.slice(0, item.start)}${item.html}${result.slice(item.end)}`;
  }

  return result;
}

function stripEmptyLtBlocks(html: string): string {
  return html.replace(/<div\b[^>]*\blt-block(?!-)[^>]*>\s*<\/div>/gi, "");
}

function unwrapVideoWrappers(html: string): string {
  return html.replace(
    /<div\b[^>]*\bvideoWrapper\b[^>]*>\s*(<video-embed\b[^>]*>\s*<\/video-embed>)\s*<\/div>/gi,
    "$1"
  );
}

function mergeAdjacentVideoIframes(html: string): string {
  const hits = findIframes(html);

  if (hits.length === 0) {
    return html;
  }

  return stripEmptyLtBlocks(
    unwrapVideoWrappers(
      applyReplacements(html, collectReplacements(html, hits))
    )
  );
}

export function prepareReadOnlyHtml(html: string): string {
  return mergeAdjacentVideoIframes(
    stripFilesTableMimeIcons(html).replace(/>\/n</g, "><").replace(/\/n/g, "<br>")
  );
}
