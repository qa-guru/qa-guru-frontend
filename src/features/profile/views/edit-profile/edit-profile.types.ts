import { Maybe, UserDto } from "api/graphql/generated/graphql";

export interface IEditProfile {
  user?: Maybe<UserDto>;
}

export interface IEditProfileForm {
  firstName?: Maybe<string>;
  lastName?: Maybe<string>;
  email?: Maybe<string>;
  phoneNumber?: Maybe<string>;
  git?: Maybe<string>;
  telegram?: Maybe<string>;
  stackOverflow?: Maybe<string>;
  linkedin?: Maybe<string>;
  skills: Maybe<Array<string>>;
}

export interface IUserSkills {
  skills?: Maybe<Array<string>>;
}

export const skills = [
  "Понимание жизненного цикла разработки программного обеспечения (SDLC)",
  "Понимание жизненного цикла тестирования программного обеспечения (STLC)",
  "Знание методологий разработки, таких как Agile и Waterfall",
  "Основы документации в тестировании (тест-планы, тест-кейсы, чек-листы)",
  "Тестирование пользовательского интерфейса",
  "Функциональное тестирование",
  "Тестирование совместимости",
  "Регрессионное тестирование",
  "Тестирование производительности",
  "Эксплораторное тестирование",
  "Основы программирования для автоматизации (Python, Java, JavaScript)",
  "Работа с фреймворками для автоматизации (Selenium, Appium, Cypress)",
  "Понимание принципов Page Object Model (POM)",
  "Создание автоматизированных тест-кейсов",
  "Настройка и поддержка тестового окружения",
  "Интеграция с CI/CD (Jenkins, GitLab CI)",
  "Работа с системами управления версиями (Git)",
  "Знание инструментов для тестирования API (Postman, Swagger)",
  "Использование инструментов для тестирования производительности (JMeter, LoadRunner)",
  "Знание инструментов для визуального тестирования (Sikuli, Applitools)",
  "Тестирование безопасности (основы, инструменты)",
  "Тестирование мобильных приложений",
  "Тестирование веб-сервисов и API",
  "Управление тестировочной документацией",
  "Работа в команде и коммуникация",
  "Критическое мышление и решение проблем",
  "Внимание к деталям",
  "Основы работы с базами данных для тестировщиков",
  "Понимание основ DevOps и Agile-практик",
];
