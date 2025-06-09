export async function blobUrlToFile(
  blobUrl: string,
  name: string
): Promise<File> {
  const res = await fetch(blobUrl);
  const blob = await res.blob();

  const hasExtension = /\.[a-zA-Z0-9]+$/.test(name);
  const finalName = hasExtension
    ? name
    : `${name}.${blob.type.split("/")[1] || "bin"}`;

  return new File([blob], finalName, { type: blob.type });
}
