import { MentorsQuery } from "../../api/graphql/generated/graphql";

export const mentorsDto: MentorsQuery = {
  mentors: {
    offset: 2,
    limit: 4,
    totalElements: 7,
    items: [
      {
        id: "123",
        email: "nik@mail.ru",
        firstName: "vasilisa",
        middleName: "vas",
        lastName: "shelkova",
        phoneNumber: "+345345345",
        locked: false,
      },
    ],
  },
};
