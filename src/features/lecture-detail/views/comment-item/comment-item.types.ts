import { CommentHomeWorkDto, Maybe } from "api/graphql/generated/graphql";

export interface ICommentItem {
  item?: Maybe<CommentHomeWorkDto>;
  editAccess?: boolean;
  isSelected?: boolean;
  commentId?: Maybe<string>;
  parentID?: Maybe<string>;
  currentUserID?: Maybe<string>;
}
