import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";

import StatusSelect from "./status-select";

describe("StatusSelect", () => {
  const homeworkId = "homework-id";

  it("status is NEW and user is the current mentor", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <StatusSelect
          currentStatus={StudentHomeWorkStatus.New}
          homeworkId={homeworkId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("status is IN_REVIEW and user is the current mentor", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <StatusSelect
          currentStatus={StudentHomeWorkStatus.InReview}
          homeworkId={homeworkId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("status is APPROVED and user is not the current mentor", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <StatusSelect
          currentStatus={StudentHomeWorkStatus.Approved}
          homeworkId={homeworkId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("status is NOT_APPROVED and user is the current mentor", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <StatusSelect
          currentStatus={StudentHomeWorkStatus.NotApproved}
          homeworkId={homeworkId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
