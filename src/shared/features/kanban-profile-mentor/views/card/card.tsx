import { ComponentType, FC } from "react";
import { Dialog, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import UserRow from "shared/components/user-row";
import { Maybe, UserDto, useUserIdQuery } from "api/graphql/generated/graphql";
import { useModal } from "react-modal-hook";
import HomeworkItem from "shared/features/homework-item";
import Comments from "shared/features/comments";
import CommentsPagination from "shared/features/comments-pagination";
import { useResponsive } from "shared/hooks";
import { formatId } from "shared/helpers";

import {
  StyledBox,
  StyledCardHeader,
  StyledClearIcon,
  StyledDialogContent,
  StyledIconBox,
  StyledPaper,
  StyledUserRowStack,
} from "./card.styled";
import { ICard } from "./card.types";

const Card: FC<ICard> = ({ card }) => {
  const { id, mentor, student, lecture, training } = card;

  const { isMobile } = useResponsive();

  const { data: dataUserId } = useUserIdQuery({ fetchPolicy: "cache-first" });

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog
      open={open}
      onClose={handleHideModal}
      fullScreen={isMobile}
      fullWidth
      maxWidth="xl"
    >
      <StyledDialogContent id="scroll-container">
        <StyledIconBox>
          <StyledClearIcon onClick={handleHideModal} />
        </StyledIconBox>
        <HomeworkItem
          dataHomeWorkByLectureAndTraining={card!}
          dataUserId={dataUserId!}
        />
        <Comments homeworkId={card.id}>
          <CommentsPagination />
        </Comments>
      </StyledDialogContent>
    </Dialog>
  ));

  const handleShowModal = () => {
    showModal();
  };

  const handleHideModal = () => {
    hideModal();
  };

  const renderUserRow = (
    icon: ComponentType,
    size: { width: number; height: number },
    user?: Maybe<UserDto>
  ) =>
    user && (
      <UserRow
        icon={icon}
        user={user}
        width={size.width}
        height={size.height}
        variant="body2"
        userId={user.id}
        hasLink
      />
    );

  const renderCardHeader = () => (
    <StyledCardHeader>
      <Typography textTransform="uppercase" variant="subtitle2">
        {formatId(training?.techStack, id)}
      </Typography>
      <Typography variant="body2">
        {card.creationDate && format(parseISO(card.creationDate), "dd.MM.yyyy")}
      </Typography>
    </StyledCardHeader>
  );

  return (
    <StyledPaper onClick={handleShowModal} elevation={4}>
      {renderCardHeader()}
      <StyledBox>
        <Typography variant="body2">{lecture?.subject}</Typography>
        <StyledUserRowStack>
          {renderUserRow(MentorIcon, { width: 24, height: 24 }, mentor)}
          {renderUserRow(StudentIcon, { width: 26, height: 26 }, student)}
        </StyledUserRowStack>
      </StyledBox>
    </StyledPaper>
  );
};

export default Card;
