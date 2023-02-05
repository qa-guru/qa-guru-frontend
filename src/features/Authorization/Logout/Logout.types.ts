export interface ILogout {
  logout: () => Promise<void>;
  isLoading: boolean;
}
