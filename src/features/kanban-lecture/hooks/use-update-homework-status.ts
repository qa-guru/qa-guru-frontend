import {
  ApprovedHomeworkFragmentDoc,
  NewTakeForReviewHomeWorkFragmentDoc,
  NotApprovedHomeworkFragmentDoc,
  useApprovedMutation,
  useNotApprovedMutation,
  useTakeForReviewMutation,
} from "api/graphql/generated/graphql";

const useUpdateHomeworkStatus = () => {
  const [takeForReview] = useTakeForReviewMutation({
    update: (cache, { data }) => {
      const takeForReviewHomework = data?.takeForReview;

      const newRef = cache.writeFragment({
        data: takeForReviewHomework,
        fragment: NewTakeForReviewHomeWorkFragmentDoc,
      });

      cache.modify({
        fields: {
          homeWorks(existingHomeWorks = { items: [] }) {
            const updatedItems = existingHomeWorks.items.filter(
              (itemRef: { __ref: string }) => itemRef.__ref !== newRef?.__ref
            );
            return {
              ...existingHomeWorks,
              items: [newRef, ...updatedItems],
            };
          },
        },
      });
    },
  });

  const [approved] = useApprovedMutation({
    update: (cache, { data }) => {
      const approvedHomework = data?.approved;

      const newRef = cache.writeFragment({
        data: approvedHomework,
        fragment: ApprovedHomeworkFragmentDoc,
      });

      cache.modify({
        fields: {
          homeWorks(existingHomeWorks = { items: [] }) {
            const updatedItems = existingHomeWorks.items.filter(
              (itemRef: { __ref: string }) => itemRef.__ref !== newRef?.__ref
            );
            return {
              ...existingHomeWorks,
              items: [newRef, ...updatedItems],
            };
          },
        },
      });
    },
  });

  const [notApproved] = useNotApprovedMutation({
    update: (cache, { data }) => {
      const notApprovedHomework = data?.notApproved;

      const newRef = cache.writeFragment({
        data: notApprovedHomework,
        fragment: NotApprovedHomeworkFragmentDoc,
      });

      cache.modify({
        fields: {
          homeWorks(existingHomeWorks = { items: [] }) {
            const updatedItems = existingHomeWorks.items.filter(
              (itemRef: { __ref: string }) => itemRef.__ref !== newRef?.__ref
            );
            return {
              ...existingHomeWorks,
              items: [newRef, ...updatedItems],
            };
          },
        },
      });
    },
  });

  return { takeForReview, approved, notApproved };
};

export default useUpdateHomeworkStatus;
