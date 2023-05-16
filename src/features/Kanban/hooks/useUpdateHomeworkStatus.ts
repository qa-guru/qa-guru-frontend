import { useTakeForReviewMutation } from "../../../api/graphql/homework/takeForReview";
import { useApprovedMutation } from "../../../api/graphql/homework/approved";
import { useNotApprovedMutation } from "../../../api/graphql/homework/notApproved";
import {
  ApprovedHomeworkFragmentDoc,
  NewTakeForReviewHomeWorkFragmentDoc,
  NotApprovedHomeworkFragmentDoc,
} from "../../../api/graphql/generated/graphql";

type HomeWorkItem = {
  __ref: string;
};

const useUpdateHomeworkStatus = () => {
  const [takeForReview] = useTakeForReviewMutation({
    update: (cache, { data }) => {
      const takeForReviewHomework = data?.takeForReview;
      if (takeForReviewHomework) {
        const newRef = cache.writeFragment({
          data: takeForReviewHomework,
          fragment: NewTakeForReviewHomeWorkFragmentDoc,
        });
        if (newRef) {
          cache.modify({
            fields: {
              homeWorks(existingHomeWorks = { items: [] as HomeWorkItem[] }) {
                const updatedItems = existingHomeWorks.items.filter(
                  (itemRef: HomeWorkItem) => itemRef.__ref !== newRef.__ref
                );
                return {
                  ...existingHomeWorks,
                  items: [newRef, ...updatedItems],
                };
              },
            },
          });
        }
      }
    },
  });

  const [approved] = useApprovedMutation({
    update: (cache, { data }) => {
      const approvedHomework = data?.approved;
      if (approvedHomework) {
        const newRef = cache.writeFragment({
          data: approvedHomework,
          fragment: ApprovedHomeworkFragmentDoc,
        });
        if (newRef) {
          cache.modify({
            fields: {
              homeWorks(existingHomeWorks = { items: [] as HomeWorkItem[] }) {
                const updatedItems = existingHomeWorks.items.filter(
                  (itemRef: HomeWorkItem) => itemRef.__ref !== newRef.__ref
                );
                return {
                  ...existingHomeWorks,
                  items: [newRef, ...updatedItems],
                };
              },
            },
          });
        }
      }
    },
  });

  const [notApproved] = useNotApprovedMutation({
    update: (cache, { data }) => {
      const notApprovedHomework = data?.notApproved;
      if (notApprovedHomework) {
        const newRef = cache.writeFragment({
          data: notApprovedHomework,
          fragment: NotApprovedHomeworkFragmentDoc,
        });
        if (newRef) {
          cache.modify({
            fields: {
              homeWorks(existingHomeWorks = { items: [] as HomeWorkItem[] }) {
                const updatedItems = existingHomeWorks.items.filter(
                  (itemRef: HomeWorkItem) => itemRef.__ref !== newRef.__ref
                );
                return {
                  ...existingHomeWorks,
                  items: [newRef, ...updatedItems],
                };
              },
            },
          });
        }
      }
    },
  });

  return { takeForReview, approved, notApproved };
};

export default useUpdateHomeworkStatus;
