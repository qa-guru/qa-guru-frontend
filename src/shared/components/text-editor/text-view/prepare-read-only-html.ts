const FILES_TABLE_RE =
  /<table\b[^>]*\bfiles-table\b[^>]*>[\s\S]*?<\/table>/gi;
const MIME_ICON_IMG_RE =
  /<img\b[^>]*\/public\/mimetypes\/[^"'>\s]*-icon-[^"'>\s]*\.png[^>]*>/gi;

function stripFilesTableMimeIcons(html: string): string {
  return html.replace(FILES_TABLE_RE, (tableHtml) =>
    tableHtml.replace(MIME_ICON_IMG_RE, "")
  );
}

export function prepareReadOnlyHtml(html: string): string {
  return stripFilesTableMimeIcons(html)
    .replace(/>\/n</g, "><")
    .replace(/\/n/g, "<br>");
}
