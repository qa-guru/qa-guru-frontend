import { useCallback, useEffect, useRef, useState } from "react";
import { HOMEWORK_FILE_GET_URI } from "config";

import {
  Maybe,
  UpdateHomeworkMutationFn,
  SendHomeWorkToCheckMutationFn,
} from "api/graphql/generated/graphql";
import { useHomeworkFileDelete, useHomeworkFileUpload } from "shared/hooks";

import {
  ConfirmedHomeworkRevision,
  HomeworkRevisionError,
  HomeworkRevisionInput,
  HomeworkRevisionReceipt,
  submitHomeworkRevision,
} from "./submit-homework-revision";

const revisionErrorMessage = (error: unknown) => {
  if (error instanceof HomeworkRevisionError) {
    if (error.stage === "empty") return "Введите текст";
    if (error.reason === "state")
      return "Статус задания изменился на сервере. Черновик и выбранные файлы оставлены в форме — проверьте актуальные данные.";
    if (error.reason === "notFound")
      return "Ответ не найден или недоступен. Черновик и выбранные файлы оставлены в форме.";
    if (error.stage === "submit")
      return "Ответ сохранён, но отправка на проверку не подтверждена. Повторите отправку.";
  }
  return "Не удалось завершить сохранение ответа. Черновик и выбранные файлы оставлены в форме. Повторите.";
};

const revisionFailureState = (
  error: unknown,
  saved: boolean,
  refreshHomework?: () => void
) => {
  if (error instanceof HomeworkRevisionError && error.reason) {
    refreshHomework?.();
  }
  return {
    loading: true,
    error: revisionErrorMessage(error),
    saved,
  };
};

const useHomeworkRevision = (
  homeworkId: Maybe<string> | undefined,
  mutations: {
    updateHomework: UpdateHomeworkMutationFn;
    sendHomeWorkToCheck?: SendHomeWorkToCheckMutationFn;
  },
  refreshHomework?: () => void
) => {
  const { uploadHomeworkFile } = useHomeworkFileUpload({
    propagateErrors: true,
  });
  const { deleteHomeworkFile } = useHomeworkFileDelete({
    propagateErrors: true,
  });
  const [state, setState] = useState({
    loading: false,
    error: "",
    saved: false,
  });
  const receiptRef = useRef<HomeworkRevisionReceipt | null>(null);
  const inFlightRef = useRef<Promise<ConfirmedHomeworkRevision | null> | null>(
    null
  );
  const generationRef = useRef(0);
  const scopeRef = useRef(homeworkId);
  scopeRef.current = homeworkId;

  useEffect(() => {
    generationRef.current += 1;
    receiptRef.current = null;
    inFlightRef.current = null;
    setState({ loading: false, error: "", saved: false });
    return () => {
      generationRef.current += 1;
    };
  }, [homeworkId]);

  const { updateHomework, sendHomeWorkToCheck } = mutations;
  const submit = useCallback(
    (input: Omit<HomeworkRevisionInput, "homeworkId">) => {
      if (!homeworkId) return Promise.resolve(null);
      if (inFlightRef.current) return inFlightRef.current;
      const generation = generationRef.current;
      const isCurrent = () =>
        generation === generationRef.current && scopeRef.current === homeworkId;
      const receipt = receiptRef.current ?? {
        homeworkId,
        uploadedFiles: [],
        deletedFileIds: [],
      };
      receiptRef.current = receipt;
      setState({ loading: true, error: "", saved: Boolean(receipt.saved) });
      const promise = submitHomeworkRevision(
        {
          updateHomework,
          sendHomeWorkToCheck,
          uploadFile: uploadHomeworkFile,
          deleteFile: deleteHomeworkFile,
          homeworkFileGetUri: HOMEWORK_FILE_GET_URI,
          isCurrent,
        },
        { ...input, homeworkId },
        receipt
      )
        .then((result) => {
          if (!isCurrent()) return null;
          if (result) receiptRef.current = null;
          return result;
        })
        .catch((error: unknown) => {
          if (isCurrent()) {
            setState(
              revisionFailureState(
                error,
                Boolean(receipt.saved),
                refreshHomework
              )
            );
          }
          return null;
        })
        .finally(() => {
          if (isCurrent()) {
            inFlightRef.current = null;
            setState((previous) => ({ ...previous, loading: false }));
          }
        });
      inFlightRef.current = promise;
      return promise;
    },
    [
      homeworkId,
      updateHomework,
      sendHomeWorkToCheck,
      uploadHomeworkFile,
      deleteHomeworkFile,
      refreshHomework,
    ]
  );

  return { ...state, submit };
};

export default useHomeworkRevision;
