import { useContext, useMemo } from "react";

import {
  HomeworksDocument,
  HomeworksQuery,
  Maybe,
  Order,
  StudentHomeWorkSortField,
  StudentHomeWorkStatus,
  useApprovedMutation,
  useNotApprovedMutation,
  useTakeForReviewMutation,
} from "api/graphql/generated/graphql";
import { useDynamicCardLimit } from "shared/hooks";

import { KanbanFormContext } from "../context/kanban-form-context";
import { HOMEWORKS_QUERY_DEFAULTS } from "../constants";

const useUpdateHomeworkStatus = () => {
  const { trainingId, lectureId, creationDateFrom, creationDateTo, mentorId } =
    useContext(KanbanFormContext);
  const dynamicLimit = useDynamicCardLimit();

  const filterObject = useMemo(() => {
    return {
      trainingId,
      lectureId,
      mentorId,
      creationDateFrom,
      creationDateTo,
    };
  }, [trainingId, lectureId, mentorId, creationDateFrom, creationDateTo]);

  const [takeForReview] = useTakeForReviewMutation({
    update: (cache, { data }) => {
      const takeForReviewHomework = data?.takeForReview;

      const existingHomeworksNew: Maybe<HomeworksQuery> = cache.readQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.CreationDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
            status: StudentHomeWorkStatus.Review,
          },
        },
      });

      const existingHomeworksReview: Maybe<HomeworksQuery> = cache.readQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.StartCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
            status: StudentHomeWorkStatus.InReview,
          },
        },
      });

      const updatedItems = existingHomeworksReview?.homeWorks?.items?.filter(
        (item) => item?.id !== takeForReviewHomework?.id
      );

      cache.writeQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.CreationDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
            status: StudentHomeWorkStatus.Review,
            mentorId: undefined,
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
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.StartCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
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

      const existingHomeworksReview: Maybe<HomeworksQuery> = cache.readQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.StartCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
            status: StudentHomeWorkStatus.InReview,
          },
        },
      });

      const existingHomeworksApproved: Maybe<HomeworksQuery> = cache.readQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.EndCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
            status: StudentHomeWorkStatus.Approved,
          },
        },
      });

      const updatedItems = existingHomeworksApproved?.homeWorks?.items?.filter(
        (item) => item?.id !== approvedHomework?.id
      );

      cache.writeQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.StartCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
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
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.EndCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
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

      const existingHomeworksReview: Maybe<HomeworksQuery> = cache.readQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.StartCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
            status: StudentHomeWorkStatus.InReview,
          },
        },
      });

      const existingHomeworksNotApproved: Maybe<HomeworksQuery> =
        cache.readQuery({
          query: HomeworksDocument,
          variables: {
            offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
            limit: dynamicLimit,
            sort: {
              field: StudentHomeWorkSortField.EndCheckingDate,
              order: Order.Desc,
            },
            filter: {
              ...filterObject,
              status: StudentHomeWorkStatus.NotApproved,
            },
          },
        });

      const updatedItems =
        existingHomeworksNotApproved?.homeWorks?.items?.filter(
          (item) => item?.id !== notApprovedHomework?.id
        );

      cache.writeQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.StartCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
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
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.EndCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
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

  const [notApprovedToApproved] = useApprovedMutation({
    update: (cache, { data }) => {
      const approvedHomework = data?.approved;

      const existingHomeworksNotApproved: Maybe<HomeworksQuery> =
        cache.readQuery({
          query: HomeworksDocument,
          variables: {
            offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
            limit: dynamicLimit,
            sort: {
              field: StudentHomeWorkSortField.EndCheckingDate,
              order: Order.Desc,
            },
            filter: {
              ...filterObject,
              status: StudentHomeWorkStatus.NotApproved,
            },
          },
        });

      const existingHomeworksApproved: Maybe<HomeworksQuery> = cache.readQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.EndCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
            status: StudentHomeWorkStatus.Approved,
          },
        },
      });

      const updatedItems = existingHomeworksApproved?.homeWorks?.items?.filter(
        (item) => item?.id !== approvedHomework?.id
      );

      cache.writeQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.EndCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
            status: StudentHomeWorkStatus.NotApproved,
          },
        },
        data: {
          homeWorks: {
            ...existingHomeworksNotApproved?.homeWorks,
            totalElements:
              parseInt(
                existingHomeworksNotApproved?.homeWorks?.totalElements,
                10
              ) - 1,
          },
        },
      });

      cache.writeQuery({
        query: HomeworksDocument,
        variables: {
          offset: HOMEWORKS_QUERY_DEFAULTS.OFFSET,
          limit: dynamicLimit,
          sort: {
            field: StudentHomeWorkSortField.EndCheckingDate,
            order: Order.Desc,
          },
          filter: {
            ...filterObject,
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

  return { takeForReview, approved, notApproved, notApprovedToApproved };
};

export default useUpdateHomeworkStatus;
