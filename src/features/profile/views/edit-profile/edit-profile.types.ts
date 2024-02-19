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
  "Selenium",
  "Appium",
  "Cypress",
  "JMeter",
  "LoadRunner",
  "Postman",
  "Swagger",
  "Git",
  "Jenkins",
  "GitLab CI",
  "Sikuli",
  "Applitools",
  "Robot Framework",
  "Cucumber",
  "SpecFlow",
  "TestComplete",
  "SoapUI",
  "Katalon Studio",
  "Puppeteer",
  "WebDriverIO",
  "Protractor",
  "TestNG",
  "JUnit",
  "Mocha",
  "PyTest",
];
