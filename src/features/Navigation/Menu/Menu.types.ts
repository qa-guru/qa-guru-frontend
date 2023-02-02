export interface IMenu {
  handleMenuClick: (pageURL: any) => void;
  pages: { title: JSX.Element; pageURL: string }[];
}
