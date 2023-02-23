export interface IContent {
  content: Array<{
    type?: string | null;
    value?: string | null;
    url?: string | null;
  } | null> | null;
}
