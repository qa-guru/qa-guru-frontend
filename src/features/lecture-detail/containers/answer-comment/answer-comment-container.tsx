import { useAnswerCommentMutation } from "api/graphql/generated/graphql";
import { FC } from "react";
import { IAnswerCommentContainer } from "./answer-comment-container.types";
import AnswerComment from "../../views/answer-comment";

const AnswerCommentContainer: FC<IAnswerCommentContainer> = (props) => {
  const { id } = props;

  const [answerComment, { loading }] = useAnswerCommentMutation();

  return (
    <AnswerComment loading={loading} answerComment={answerComment} id={id} />
  );
};

export default AnswerCommentContainer;
