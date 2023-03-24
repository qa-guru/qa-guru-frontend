export interface IContentSerialization {
  content: Array<{
    type?: string | null;
    value?: string | null;
    url?: string | null;
  } | null> | null;
}
