import {
  HomeworksApprovedDocument,
  HomeworksApprovedQuery,
  HomeworksNewDocument,
  HomeworksNewQuery,
  HomeworksNotApprovedDocument,
  HomeworksNotApprovedQuery,
  HomeworksReviewDocument,
  HomeworksReviewQuery,
  Maybe,
  Order,
  StudentHomeWorkSortField,
  StudentHomeWorkStatus,
  useApprovedMutation,
  useNotApprovedMutation,
  useTakeForReviewMutation,
} from "api/graphql/generated/graphql";

import { useDynamicCardLimit } from "./use-dynamic-card-limit";
import { HOMEWORKS_QUERY_DEFAULTS } from "../constants";

const useUpdateHomeworkStatus = () => {
  const dynamicLimit = useDynamicCardLimit();

  const [takeForReview] = useTakeForReviewMutation({
    update: (cache, { data }) => {
      const takeForReviewHomework = data?.takeForReview;

      const existingHomeworksNew: Maybe<HomeworksNewQuery> = cache.readQuery({
        query: HomeworksNewDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.CreationDate,
            order: Order.Desc,
          },
          filter: {
            status: StudentHomeWorkStatus.New,
          },
        },
      });

      const existingHomeworksReview: Maybe<HomeworksReviewQuery> =
        cache.readQuery({
          query: HomeworksReviewDocument,
          variables: {
            offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
            limit: dynamicLimit,
            sort: {
              field: StudentHomeWorkSortField.StartCheckingDate,
              order: Order.Desc,
            },
            filter: {
              status: StudentHomeWorkStatus.InReview,
            },
          },
        });

      const updatedItems = existingHomeworksReview?.homeWorks?.items?.filter(
        (item) => item?.id !== takeForReviewHomework?.id
      );

      cache.writeQuery({
        query: HomeworksNewDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.CreationDate,
            order: Order.Desc,
          },
          filter: {
            status: StudentHomeWorkStatus.New,
          },
        },
        data: {
          homeWorks: {
            ...existingHomeworksNew?.homeWorks,
            totalElements:
              parseInt(existingHomeworksNew?.homeWorks?.totalElements, 10) - 1,
          },
        },
      });

      cache.writeQuery({
        query: HomeworksReviewDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.StartCheckingDate,
            order: Order.Desc,
          },
          filter: {
            status: StudentHomeWorkStatus.InReview,
          },
        },
        data: {
          homeWorks: {
            ...existingHomeworksReview?.homeWorks,
            items: [takeForReviewHomework, ...(updatedItems || [])],
            totalElements:
              parseInt(existingHomeworksReview?.homeWorks?.totalElements, 10) +
              1,
          },
        },
      });
    },
  });

  const [approved] = useApprovedMutation({
    update: (cache, { data }) => {
      const approvedHomework = data?.approved;

      const existingHomeworksReview: Maybe<HomeworksReviewQuery> =
        cache.readQuery({
          query: HomeworksReviewDocument,
          variables: {
            offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
            limit: dynamicLimit,
            sort: {
              field: StudentHomeWorkSortField.StartCheckingDate,
              order: Order.Desc,
            },
            filter: {
              status: StudentHomeWorkStatus.InReview,
            },
          },
        });

      const existingHomeworksApproved: Maybe<HomeworksApprovedQuery> =
        cache.readQuery({
          query: HomeworksApprovedDocument,
          variables: {
            offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
            limit: dynamicLimit,
            sort: {
              field: StudentHomeWorkSortField.EndCheckingDate,
              order: Order.Desc,
            },
            filter: {
              status: StudentHomeWorkStatus.Approved,
            },
          },
        });

      const updatedItems = existingHomeworksApproved?.homeWorks?.items?.filter(
        (item) => item?.id !== approvedHomework?.id
      );

      cache.writeQuery({
        query: HomeworksReviewDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.StartCheckingDate,
            order: Order.Desc,
          },
          filter: {
            status: StudentHomeWorkStatus.InReview,
          },
        },
        data: {
          homeWorks: {
            ...existingHomeworksReview?.homeWorks,
            totalElements:
              parseInt(existingHomeworksReview?.homeWorks?.totalElements, 10) -
              1,
          },
        },
      });

      cache.writeQuery({
        query: HomeworksApprovedDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.EndCheckingDate,
            order: Order.Desc,
          },
          filter: {
            status: StudentHomeWorkStatus.Approved,
          },
        },
        data: {
          homeWorks: {
            ...existingHomeworksApproved?.homeWorks,
            items: [approvedHomework, ...(updatedItems || [])],
            totalElements:
              parseInt(
                existingHomeworksApproved?.homeWorks?.totalElements,
                10
              ) + 1,
          },
        },
      });
    },
  });

  const [notApproved] = useNotApprovedMutation({
    update: (cache, { data }) => {
      const notApprovedHomework = data?.notApproved;

      const existingHomeworksReview: Maybe<HomeworksReviewQuery> =
        cache.readQuery({
          query: HomeworksReviewDocument,
          variables: {
            offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
            limit: dynamicLimit,
            sort: {
              field: StudentHomeWorkSortField.StartCheckingDate,
              order: Order.Desc,
            },
            filter: {
              status: StudentHomeWorkStatus.InReview,
            },
          },
        });

      const existingHomeworksNotApproved: Maybe<HomeworksNotApprovedQuery> =
        cache.readQuery({
          query: HomeworksNotApprovedDocument,
          variables: {
            offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
            limit: dynamicLimit,
            sort: {
              field: StudentHomeWorkSortField.EndCheckingDate,
              order: Order.Desc,
            },
            filter: {
              status: StudentHomeWorkStatus.NotApproved,
            },
          },
        });

      const updatedItems =
        existingHomeworksNotApproved?.homeWorks?.items?.filter(
          (item) => item?.id !== notApprovedHomework?.id
        );

      cache.writeQuery({
        query: HomeworksReviewDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.StartCheckingDate,
            order: Order.Desc,
          },
          filter: {
            status: StudentHomeWorkStatus.InReview,
          },
        },
        data: {
          homeWorks: {
            ...existingHomeworksReview?.homeWorks,
            totalElements:
              parseInt(existingHomeworksReview?.homeWorks?.totalElements, 10) -
              1,
          },
        },
      });

      cache.writeQuery({
        query: HomeworksNotApprovedDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.EndCheckingDate,
            order: Order.Desc,
          },
          filter: {
            status: StudentHomeWorkStatus.NotApproved,
          },
        },
        data: {
          homeWorks: {
            ...existingHomeworksNotApproved?.homeWorks,
            items: [notApprovedHomework, ...(updatedItems || [])],
            totalElements:
              parseInt(
                existingHomeworksNotApproved?.homeWorks?.totalElements,
                10
              ) + 1,
          },
        },
      });
    },
  });

  return { takeForReview, approved, notApproved };
};

export default useUpdateHomeworkStatus;
