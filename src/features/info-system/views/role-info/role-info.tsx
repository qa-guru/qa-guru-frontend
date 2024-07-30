import React from "react";
import { alpha, Typography, useTheme } from "@mui/material";
import CustomLink from "shared/components/custom-link";

import {
  StyledIconBox,
  StyledIconStack,
  StyledInfoStack,
  StyledPaper,
  StyledTypography,
} from "../info-system/info-system.styled";
import {
  StyledCoPresentIcon,
  StyledDescriptionTypography,
  StyledNestedPaper,
  StyledNestedPaperStack,
  StyledPaperStack,
} from "./role-info.styled";

const RoleInfo: React.FC = () => {
  const theme = useTheme();
  const { indigo, rating } = theme.palette.app;

  const roles = [
    {
      title: "Студент",
      description: (
        <ol>
          <li>Доступ к купленным курсам по выбранному тарифу</li>
          <li>Доска заданий для студента</li>
          <li>
            Чат с менторами, преподавателями и другими студентами в комментариях
            к домашним заданиям
          </li>
        </ol>
      ),
      color: rating.upTo50,
    },
    {
      title: "Студент + Ментор",
      description: (
        <ol>
          <li>Доступ к купленным курсам по выбранному тарифу</li>
          <li>Доска заданий для студента</li>
          <li>Доска заданий для ментора</li>
          <li>Проверка домашних заданий других студентов и смена их статуса</li>
          <li>
            Чат со студентами, преподавателями и другими менторами в
            комментариях к домашним заданиям
          </li>
        </ol>
      ),
      color: rating.upTo100,
    },
    {
      title: "Студент + Преподаватель",
      description: (
        <ol>
          <li>Доступ к купленным курсам по выбранному тарифу</li>
          <li>Доска заданий для студента</li>
          <li>Доска заданий для ментора</li>
          <li>Проверка домашних заданий других студентов и смена их статуса</li>
          <li>
            Возможность создавать собственные курсы и вести занятия по
            согласованию с админом
          </li>
          <li>
            Чат со студентами, преподавателями и другими менторами в
            комментариях к домашним заданиям
          </li>
        </ol>
      ),
      color: rating.upTo200,
    },
    {
      title: "Админ",
      description: (
        <ol>
          <li>Полный доступ к редактированию и созданию курсов, занятий</li>
          <li>Мониторинг платформы</li>
        </ol>
      ),
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
                <StyledDescriptionTypography variant="body2">
                  {role.description}
                </StyledDescriptionTypography>
              </StyledNestedPaperStack>
            </StyledNestedPaper>
          ))}
        </StyledInfoStack>
      </StyledPaper>
    </StyledPaperStack>
  );
};

export default RoleInfo;
