import {
  SubCommentHomeWorkDtoFragmentDoc,
  useAnswerCommentMutation,
  useUserQuery,
} from "api/graphql/generated/graphql";
import { FC } from "react";

import { IAnswerCommentContainer } from "./answer-comment-container.types";
// уберите релатив импорты начинающиеся с ../ - это плоххая практика
import AnswerComment from "../../views/answer-comment";

type AnswerCommentItem = {
  __ref: string;
};

const AnswerCommentContainer: FC<IAnswerCommentContainer> = (props) => {
  const { id, onReplySuccess } = props;
  const { data } = useUserQuery();

  const [answerComment, { loading }] = useAnswerCommentMutation({
    update: (cache, { data }) => {
      const newAnswerComment = data?.answerComment;

      const newCommentRef = cache.writeFragment({
        data: newAnswerComment,
        fragment: SubCommentHomeWorkDtoFragmentDoc,
      });

      // можно, но пожалуйста, переделайте на state
      // так бизнеслогику в слой кэширования запихали, еще
      // и сравнение по рефам внутри этого. сделайте плз класс типа
      // class CommentsService {
      //   comments: any[],
      //   loading: boolean
      //
      //   async fetch() {
      //     ...
      //   }
      // }
      cache.modify({
        fields: {
          commentsHomeWorkByHomeWork(existingComments = { items: [] }) {
            const updatedItems = existingComments.items.filter(
              (itemRef: AnswerCommentItem) =>
                itemRef.__ref !== newCommentRef?.__ref
            );
            return {
              ...existingComments,
              items: [newCommentRef, ...updatedItems],
            };
          },
        },
      });
    },
  });

  return (
    <AnswerComment
      loading={loading}
      answerComment={answerComment}
      id={id}
      dataUser={data}
      onReplySuccess={onReplySuccess}
    />
  );
};

export default AnswerCommentContainer;
