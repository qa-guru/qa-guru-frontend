export interface ISendButtons {
  onReply: () => void;
  onCancel?: () => void;
  hideCancel?: boolean;
  loading: boolean;
}
