import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import UpdateHomework from "./UpdateHomework";
import { HomeWorkByStudentAndLectureQuery } from "../../../generated/graphql";

const mockSetOpenHomeWorkEdit: any = () => {};
const mockUpdateHomework: any = () => {};
const mockDataHomework: HomeWorkByStudentAndLectureQuery = {
  __typename: "Query",
  homeWorkByStudentAndLecture: {
    __typename: "StudentHomeWorkDto",
    id: "string",
    answer: "string",
    status: null,
    creationDate: new Date(),
    startCheckingDate: new Date(),
    endCheckingDate: new Date(),
    lecture: {
      __typename: "LectureInfoDto",
      id: "string",
      subject: "string",
    },
    student: {
      __typename: "UserDto",
      id: "string",
      firstName: "string",
      middleName: "string",
      lastName: "string",
    },
    mentor: {
      __typename: "UserDto",
      id: "string",
      firstName: "string",
      middleName: "string",
      lastName: "string",
    },
  },
};

describe("UpdateHomework", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateHomework
          setOpenHomeWorkEdit={mockSetOpenHomeWorkEdit}
          loading={true}
          updateHomework={mockUpdateHomework}
          dataHomework={mockDataHomework}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("the component is not Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateHomework
          setOpenHomeWorkEdit={mockSetOpenHomeWorkEdit}
          loading={false}
          updateHomework={mockUpdateHomework}
          dataHomework={mockDataHomework}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
