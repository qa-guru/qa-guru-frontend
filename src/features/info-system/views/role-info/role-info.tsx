import React from "react";
import { alpha, Typography, useTheme } from "@mui/material";

import {
  StyledIconBox,
  StyledIconStack,
  StyledInfoStack,
  StyledPaper,
  StyledTypography,
} from "../info-system/info-system.styled";
import {
  StyledCoPresentIcon,
  StyledNestedPaper,
  StyledNestedPaperStack,
  StyledPaperStack,
} from "./role-info.styled";
import CustomLink from "../../../../shared/components/custom-link";

const RoleInfo: React.FC = () => {
  const theme = useTheme();
  const { indigo, rating } = theme.palette.app;

  const roles = [
    {
      title: "Студент",
      description:
        "Доступ к купленным курсам по выбранному тарифу, доска заданий для студента, чат с менторами, преподавателями и другими студентами в комментариях к домашним заданиям.",
      color: rating.upTo50,
    },
    {
      title: "Ментор",
      description:
        "Доступ к купленным курсам по выбранному тарифу, доска заданий для студента, доска заданий для ментора, проверка домашних заданий других студентов и смена их статуса, чат со студентами, преподавателями и другими менторами в комментариях к домашним заданиям.",
      color: rating.upTo100,
    },
    {
      title: "Преподаватель",
      description:
        "Доступ к купленным курсам по выбранному тарифу, доска заданий для студента, доска заданий для ментора. Возможность создавать собственные курсы и вести занятия по согласованию с админом, проверка домашних заданий других студентов и смена их статуса, чат со студентами, менторами и другими преподавателями в комментариях к домашним заданиям.",
      color: rating.upTo200,
    },
    {
      title: "Админ",
      description:
        "Полный доступ к редактированию и созданию курсов, занятий, мониторинг платформы.",
      color: rating.upTo500,
    },
  ];

  return (
    <StyledPaperStack>
      <StyledPaper>
        <StyledInfoStack>
          <StyledIconStack>
            <StyledIconBox color={indigo}>
              <StyledCoPresentIcon />
              <StyledTypography color={indigo} variant="caption">
                Роли
              </StyledTypography>
            </StyledIconBox>
            <Typography variant="h3">
              Какие бывают роли и зачем они нужны?
            </Typography>
          </StyledIconStack>
          <StyledInfoStack>
            <Typography variant="body2">
              На платформе QA.GURU существует всего четыре роли: "Студент",
              "Ментор", "Преподаватель" и "Админ". При первой регистрации каждый
              пользователь получает роль студента. После успешного прохождения
              курса эту роль можно дополнить ролью ментора.
            </Typography>
            <Typography variant="h5">
              Почему классно попробовать себя в роли ментора?
            </Typography>
            <Typography variant="body2">
              QA.GURU – это, в первую очередь, большое дружное комьюнити, в
              котором каждый развивается и растет как QA Automation Engineer.
              Если ты пока не чувствуешь достаточную уверенность, чтобы
              отправиться на собеседования, или параллельно с поиском работы
              хочешь отточить навыки, можно стать ментором на платформе. Это
              прокачает твои профессиональные скиллы, ведь так ты попробуешь
              себя в роли наставника, точно закрепишь полученные знания и
              посмотришь по-новому на пройденный материал. Для этого напиши в
              &nbsp;
              <CustomLink path="https://t.me/qa_guru_support">
                @qa_guru_support
              </CustomLink>
              .
            </Typography>
            <Typography variant="body2">
              Многие бывшие студенты QA.GURU, которые уже нашли работу мечты или
              закрепились на текущей работе в качестве автоматизатора, остаются
              на платформе в качестве менторов. Это поддерживает непрерывное
              развитие в сфере QA благодаря общению и работе с комьюнити.
            </Typography>
            <Typography variant="h5">А как стать преподавателем?</Typography>
            <Typography variant="body2">
              Для опытных инженеров, уже попробовавших себя в роли ментора в
              QA.GURU, есть возможность стать преподавателем. Это подойдет тем,
              кто имеет уже достаточно опыта и скиллов в сфере тестирования и
              хочет поделиться ими с комьюнити. Для этого напиши в &nbsp;
              <CustomLink path="https://t.me/qa_guru_support">
                @qa_guru_support
              </CustomLink>
              .
            </Typography>
          </StyledInfoStack>
          {roles.map((role, index) => (
            <StyledNestedPaper
              key={index}
              sx={{ backgroundColor: alpha(role.color, 0.2) }}
            >
              <StyledNestedPaperStack>
                <Typography variant="h5">{role.title}</Typography>
                <Typography variant="body2">{role.description}</Typography>
              </StyledNestedPaperStack>
            </StyledNestedPaper>
          ))}
        </StyledInfoStack>
      </StyledPaper>
    </StyledPaperStack>
  );
};

export default RoleInfo;
