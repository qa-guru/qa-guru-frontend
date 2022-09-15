import { Serializer } from "jsonapi-serializer";
import { IFormAutoTestsInput } from "../models/FormMain/FormMain.types";

const dataSerialize = (data: IFormAutoTestsInput, countManualTest: any) => {
  const {
    url,
    stack,
    console_check,
    title_check,
    title_1,
    steps_1,
    title_2,
    steps_2,
    title_3,
    steps_3,
    allure_report,
    attachments,
    source_code,
    ci,
    browser_type,
    browsers_hub,
    notification,
    test_management,
  } = data;

  const addManualTestInDataSerialize = (dataProp: any) => {
    const arr = [
      {
        title: title_1,
        steps: steps_1,
      },
      {
        title: title_2,
        steps: steps_2,
      },
      {
        title: title_3,
        steps: steps_3,
      },
    ];

    for (let i = 4; i <= countManualTest; i++) {
      const { [`title_${i}`]: Title, [`steps_${i}`]: Steps } = dataProp;
      arr.push({ title: Title ?? "", steps: Steps ?? "" });
    }

    return arr;
  };

  const json = new Serializer("data", {
    url: url,
    stack: stack,
    tests: {
      automated: [
        {
          name: "console_check",
          generate:
            (console_check && console_check[0]) ||
            (console_check === null && false),
        },
        {
          name: "title_check",
          generate:
            (title_check && title_check[0]) || (title_check === null && false),
        },
      ],
      manual: addManualTestInDataSerialize(data),
    },
    visualization: {
      allure_report:
        (allure_report && allure_report[0]) ||
        (allure_report === null && false),
      attachments: [
        {
          name: "screenshots",
          generate: attachments[0] ? true : false,
        },
        {
          name: "video",
          generate: attachments[1] ? true : false,
        },
        {
          name: "console_logs",
          generate: attachments[2] ? true : false,
        },
        {
          name: "network_logs",
          generate: attachments[3] ? true : false,
        },
        {
          name: "page_source",
          generate: attachments[4] ? true : false,
        },
      ],
    },
    source_code: source_code,
    ci: ci,
    browser_type: browser_type,
    browsers_hub: browsers_hub,
    notification: [
      {
        name: "email",
        generate: notification[0] ? true : false,
      },
      {
        name: "telegram",
        generate: notification[1] ? true : false,
      },
      {
        name: "slack",
        generate: notification[2] ? true : false,
      },
      {
        name: "skype",
        generate: notification[3] ? true : false,
      },
      {
        name: "mattermost",
        generate: notification[4] ? true : false,
      },
      {
        name: "icq",
        generate: notification[5] ? true : false,
      },
    ],
    test_management: {
      name: "allure_testops",
      generate: test_management[0] ? true : false,
    },
    issue_tracker: {
      name: "jira",
      generate: test_management[1] ? true : false,
    },
  });

  json.serialize(data);

  return JSON.stringify(json, null, 2);
};

export default dataSerialize;
