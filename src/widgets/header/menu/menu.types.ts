export interface IAppMenu {
  pages: { pageURL: string; title: JSX.Element }[];
  handleClickNavMenu: (pageURL: string) => void;
}
