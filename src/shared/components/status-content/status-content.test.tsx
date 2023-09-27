import { MemoryRouter } from "react-router-dom";
import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";
import { render } from "test/utils-test";
import StatusContent from "./status-content";

describe("StatusContent", () => {
  it("status is New", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <StatusContent status={StudentHomeWorkStatus.New} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("status is Approved", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <StatusContent status={StudentHomeWorkStatus.Approved} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("status is InReview", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <StatusContent status={StudentHomeWorkStatus.InReview} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("status is NotApproved", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <StatusContent status={StudentHomeWorkStatus.NotApproved} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
