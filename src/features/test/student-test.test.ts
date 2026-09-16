import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  isGraphqlAccessDenied,
  isStudentTestDumpOperation,
  studentSelectedAnswers,
  studentTestQuestions,
} from "./student-test";

describe("isStudentTestDumpOperation", () => {
  it("flags ADMIN dump queries the student runner must not call", () => {
    assert.equal(isStudentTestDumpOperation("testTestGroupsById"), true);
    assert.equal(isStudentTestDumpOperation("testAnswerByQuestion"), true);
    assert.equal(isStudentTestDumpOperation("testQuestions"), true);
    assert.equal(isStudentTestDumpOperation("startTest"), false);
    assert.equal(isStudentTestDumpOperation("testAttemptQuestions"), false);
    assert.equal(isStudentTestDumpOperation("testAttempt"), false);
  });
});

describe("isGraphqlAccessDenied", () => {
  it("treats B5 dump 403 and L4 object prohibition as a gate", () => {
    assert.equal(isGraphqlAccessDenied({ message: "Access Denied" }), true);
    assert.equal(
      isGraphqlAccessDenied({
        message: "access to the object with ID '12' is prohibited",
      }),
      true
    );
    assert.equal(
      isGraphqlAccessDenied({
        graphQLErrors: [{ message: "Forbidden" }],
      }),
      true
    );
    assert.equal(
      isGraphqlAccessDenied({ message: "unfinished test" }),
      false
    );
  });
});

describe("studentTestQuestions", () => {
  const bank = [
    {
      id: "q1",
      text: "Which HTTP method creates?",
      testAnswers: [
        { id: "a1", text: "POST", correct: true },
        { id: "a2", text: "GET", correct: false },
      ],
    },
  ];

  it("maps attempt questions without copying correct", () => {
    const questions = studentTestQuestions({
      attemptQuestions: [
        {
          testQuestion: {
            id: "q1",
            text: "Which HTTP method creates?",
            testAnswers: [
              { id: "a1", text: "POST", correct: true },
              { id: "a2", text: "GET", correct: false },
            ],
          },
          testAnswerResults: [
            { testAnswer: { id: "a1", text: "POST", correct: true } },
            { testAnswer: { id: "a2", text: "GET", correct: false } },
          ],
        },
      ],
    });

    assert.deepEqual(questions, [
      {
        id: "q1",
        text: "Which HTTP method creates?",
        answers: [
          { id: "a1", text: "POST" },
          { id: "a2", text: "GET" },
        ],
      },
    ]);
    assert.equal("correct" in questions[0].answers[0], false);
  });

  it("fills unanswered rows from testGroup when testQuestion is missing", () => {
    const questions = studentTestQuestions({
      attemptQuestions: [
        {
          testQuestion: null,
          testAnswerResults: [
            { testAnswer: { id: "a1", text: "POST" } },
            { testAnswer: { id: "a2", text: "GET" } },
          ],
        },
      ],
      testGroupQuestions: bank,
    });

    assert.equal(questions[0].id, "q1");
    assert.equal(questions[0].text, "Which HTTP method creates?");
    assert.deepEqual(
      questions[0].answers.map((answer) => answer.id),
      ["a1", "a2"]
    );
    assert.equal(
      questions[0].answers.some((answer) => "correct" in answer),
      false
    );
  });

  it("does not use ADMIN dump names as a question source", () => {
    const questions = studentTestQuestions({
      attemptQuestions: [],
      testGroupQuestions: bank,
    });

    assert.equal(questions[0].id, "q1");
    assert.equal("correct" in questions[0].answers[0], false);
  });
});

describe("studentSelectedAnswers", () => {
  it("restores only answers the student marked, not the key", () => {
    assert.deepEqual(
      studentSelectedAnswers([
        {
          testQuestion: { id: "q1", text: "Q" },
          testAnswerResults: [
            {
              testAnswer: { id: "a1", text: "POST", correct: true },
              answer: true,
            },
            {
              testAnswer: { id: "a2", text: "GET", correct: false },
              answer: false,
            },
          ],
        },
      ]),
      [{ questionId: "q1", answerIds: ["a1"] }]
    );
  });
});
