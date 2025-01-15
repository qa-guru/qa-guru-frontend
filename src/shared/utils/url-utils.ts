export const createUrlWithParams = (
  urlTemplate: string,
  params: Record<string, string | number>
): string => {
  let url = urlTemplate;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, encodeURIComponent(String(value)));
  }
  return url;
};
