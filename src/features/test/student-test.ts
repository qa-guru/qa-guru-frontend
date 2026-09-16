export const STUDENT_TEST_DUMP_OPERATIONS = [
  "testTestGroupsById",
  "testAnswerByQuestion",
  "testQuestions",
] as const;

export type StudentTestAnswer = {
  id: string;
  text: string;
};

export type StudentTestQuestion = {
  id: string;
  text: string;
  answers: StudentTestAnswer[];
};

export type StudentUserAnswer = {
  questionId: string;
  answerIds: string[];
};

type IdText = {
  id?: string | null;
  text?: string | null;
  correct?: unknown;
};

export type AttemptQuestionInput = {
  testQuestion?: (IdText & {
    testAnswers?: Array<IdText | null> | null;
  }) | null;
  testAnswerResults?: Array<{
    testAnswer?: IdText | null;
    answer?: boolean | null;
  } | null> | null;
};

export type BankQuestionInput = IdText & {
  testAnswers?: Array<IdText | null> | null;
};

type GraphqlLikeError = {
  message?: string;
  graphQLErrors?: ReadonlyArray<{ message?: string } | null> | null;
};

function asIdText(item: IdText | null | undefined): StudentTestAnswer | null {
  if (typeof item?.id !== "string" || item.id.length === 0) {
    return null;
  }

  if (typeof item.text !== "string") {
    return null;
  }

  return { id: item.id, text: item.text };
}

function answersFrom(
  list?: Array<IdText | null> | null
): StudentTestAnswer[] {
  return (list ?? [])
    .map(asIdText)
    .filter((answer): answer is StudentTestAnswer => answer != null);
}

function matchBankQuestion(
  answerIds: string[],
  bank?: Array<BankQuestionInput | null> | null
): BankQuestionInput | null {
  if (!answerIds.length) {
    return null;
  }

  const ids = new Set(answerIds);

  return (
    (bank ?? []).find((question) =>
      (question?.testAnswers ?? []).some(
        (answer) => answer?.id && ids.has(answer.id)
      )
    ) ?? null
  );
}

export function isStudentTestDumpOperation(name: string): boolean {
  return (STUDENT_TEST_DUMP_OPERATIONS as readonly string[]).includes(name);
}

export function isGraphqlAccessDenied(
  error?: GraphqlLikeError | null
): boolean {
  if (!error) {
    return false;
  }

  const chunks = [
    error.message,
    ...(error.graphQLErrors ?? []).map((item) => item?.message),
  ];

  return chunks.some((message) =>
    /access denied|forbidden|unauthorized|prohibited|недоступн/i.test(
      message ?? ""
    )
  );
}

function firstText(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return "";
}

function questionFromAttemptRow(
  row: AttemptQuestionInput,
  bank?: Array<BankQuestionInput | null> | null
): StudentTestQuestion | null {
  const fromResults = answersFrom(
    row.testAnswerResults?.map((result) => result?.testAnswer ?? null)
  );
  const fromQuestion = answersFrom(row.testQuestion?.testAnswers);
  const answers = fromResults.length ? fromResults : fromQuestion;
  const matched = matchBankQuestion(
    answers.map((answer) => answer.id),
    bank
  );
  const id = row.testQuestion?.id || matched?.id;
  const text = firstText(row.testQuestion?.text, matched?.text);

  if (typeof id !== "string" || id.length === 0 || !answers.length) {
    return null;
  }

  return { id, text, answers };
}

function questionsFromBank(
  testGroupQuestions?: Array<BankQuestionInput | null> | null
): StudentTestQuestion[] {
  return (testGroupQuestions ?? [])
    .map((question) => {
      const mapped = asIdText(question);
      const answers = answersFrom(question?.testAnswers);

      if (!mapped || !answers.length) {
        return null;
      }

      return { id: mapped.id, text: mapped.text, answers };
    })
    .filter((question): question is StudentTestQuestion => question != null);
}

export function studentTestQuestions(input: {
  attemptQuestions?: Array<AttemptQuestionInput | null> | null;
  testGroupQuestions?: Array<BankQuestionInput | null> | null;
}): StudentTestQuestion[] {
  const mapped = (input.attemptQuestions ?? [])
    .filter((row): row is AttemptQuestionInput => row != null)
    .map((row) => questionFromAttemptRow(row, input.testGroupQuestions))
    .filter((question): question is StudentTestQuestion => question != null);

  if (mapped.length) {
    return mapped;
  }

  return questionsFromBank(input.testGroupQuestions);
}

export function studentSelectedAnswers(
  attemptQuestions?: Array<AttemptQuestionInput | null> | null
): StudentUserAnswer[] {
  const restored: StudentUserAnswer[] = [];

  for (const row of attemptQuestions ?? []) {
    const questionId = row?.testQuestion?.id;
    const answerIds = (row?.testAnswerResults ?? [])
      .filter((result) => result?.answer === true && result.testAnswer?.id)
      .map((result) => result!.testAnswer!.id as string);

    if (typeof questionId !== "string" || !answerIds.length) {
      continue;
    }

    restored.push({ questionId, answerIds });
  }

  return restored;
}
