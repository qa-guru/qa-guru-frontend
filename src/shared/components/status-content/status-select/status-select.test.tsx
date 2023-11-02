import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";
import StatusSelect from "./status-select";

describe("StatusSelect", () => {
  const currentUserId = "current-user-id";
  const mentorId = "mentor-id";
  const homeworkId = "homework-id";

  it("status is NEW and user is the current mentor", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <StatusSelect
          currentUserId={currentUserId}
          mentorId={currentUserId}
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
          currentUserId={currentUserId}
          mentorId={currentUserId}
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
          currentUserId={currentUserId}
          mentorId={mentorId}
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
          currentUserId={currentUserId}
          mentorId={currentUserId}
          currentStatus={StudentHomeWorkStatus.NotApproved}
          homeworkId={homeworkId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
