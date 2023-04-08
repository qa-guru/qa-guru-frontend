import { LectureHomeWorkQuery } from "../../api/graphql/generated/graphql";

export const lectureHomework: LectureHomeWorkQuery = {
  lectureHomeWork: [
    {
      type: "text",
      value:
        "Здесь будет отображаться текст домашнего задания к текущей лекции.\n" +
        "Пример домашнего задания:\n" +
        '1. Есть ли разница между $("h1 div"); и $("h1").$("div").\n' +
        "Может ли привести к тому что, поиск найдёт разные элементы?\n" +
        "2. Разработайте следующий автотест:\n" +
        " - Откройте страницу Selenide в Github\n" +
        " - Перейдите в раздел Wiki проекта\n" +
        " - Убедитесь, что в списке страниц (Pages) есть страница SoftAssertions\n" +
        " - Откройте страницу SoftAssertions, проверьте что внутри есть пример кода для JUnit5",
    },
  ],
};
