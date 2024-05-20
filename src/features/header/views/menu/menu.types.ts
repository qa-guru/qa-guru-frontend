export interface IAppMenu {
  pages: { pageURL: string; title: string; id: number }[];
  handleClickNavMenu: (pageURL: string) => void;
}
