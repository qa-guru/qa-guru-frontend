import { FC, useCallback } from "react";
import { useApolloClient } from "@apollo/client";

import {
  useUpdateHomeworkMutation,
  useSendHomeWorkToCheckMutation,
} from "api/graphql/generated/graphql";

import { IUpdateHomeworkContainer } from "./update-homework-container.types";
import UpdateHomework from "../view";

const UpdateHomeworkContainer: FC<IUpdateHomeworkContainer> = ({
  setOpenHomeWorkEdit,
  answer,
  homeWorkId,
  resubmit,
  submitLabel,
}) => {
  const client = useApolloClient();
  const [updateHomework, { loading: saving }] = useUpdateHomeworkMutation();
  const [sendHomeWorkToCheck, { loading: submitting }] =
    useSendHomeWorkToCheckMutation({
      refetchQueries: ({ data }) =>
        data?.sendHomeWorkToCheck?.id === homeWorkId
          ? Array.from(client.getObservableQueries().values())
              .filter((query) => query.queryName === "homeworks")
              .map((query) => ({
                query: query.options.query,
                variables: query.options.variables,
              }))
          : [],
    });

  const refreshHomework = useCallback(() => {
    client.getObservableQueries().forEach((query) => {
      if (
        ["homeWork", "homeWorkByLectureAndTraining", "homeworks"].includes(
          query.queryName ?? ""
        )
      ) {
        query.refetch();
      }
    });
  }, [client]);

  return (
    <UpdateHomework
      setOpenHomeWorkEdit={setOpenHomeWorkEdit}
      loading={saving || submitting}
      updateHomework={updateHomework}
      sendHomeWorkToCheck={sendHomeWorkToCheck}
      answer={answer}
      homeWorkId={homeWorkId}
      resubmit={resubmit}
      submitLabel={submitLabel}
      refreshHomework={refreshHomework}
    />
  );
};

export default UpdateHomeworkContainer;
