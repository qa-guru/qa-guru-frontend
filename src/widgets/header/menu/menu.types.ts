export interface IAppMenu {
  pages: { pageURL: string; title: JSX.Element; id: number }[];
  handleClickNavMenu: (pageURL: string) => void;
}
