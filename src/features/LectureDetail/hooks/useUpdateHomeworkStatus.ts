import { useTakeForReviewMutation } from "../../../api/graphql/homework/takeForReview";
import { useApprovedMutation } from "../../../api/graphql/homework/approved";
import { useNotApprovedMutation } from "../../../api/graphql/homework/notApproved";

const useUpdateHomeworkStatus = () => {
  const [takeForReview] = useTakeForReviewMutation();
  const [approved] = useApprovedMutation();
  const [notApproved] = useNotApprovedMutation();

  return { takeForReview, approved, notApproved };
};

export default useUpdateHomeworkStatus;
