import { FC } from "react";
import { Dialog, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import UserRow from "shared/components/user-row";
import { useUserIdQuery } from "api/graphql/generated/graphql";
import { useModal } from "react-modal-hook";
import HomeworkItem from "features/lecture-detail/views/homework-item";
import { Comments } from "features/lecture-detail/containers";
import CommentsPagination from "features/lecture-detail/views/comments-pagination";
import useResponsive from "shared/hooks/use-responsive";

import {
  StyledBox,
  StyledCardHeader,
  StyledClearIcon,
  StyledDialogContent,
  StyledPaper,
  StyledUserRowStack,
} from "./card.styled";
import { ICard } from "./card.types";
import { getFormattedId } from "../../helpers/get-formatted-id";

const Card: FC<ICard> = ({ card }) => {
  const { id, mentor, student, lecture, training } = card;

  const { isMobile } = useResponsive();

  const { data: dataUserId } = useUserIdQuery({ fetchPolicy: "cache-first" });
  const isCurrentHomeworkActive = student?.id === dataUserId?.user?.id;

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog
      open={open}
      onClose={handleHideModal}
      fullScreen={isMobile}
      fullWidth
      maxWidth="xl"
    >
      <StyledDialogContent id="scroll-container">
        <StyledClearIcon onClick={handleHideModal} />
        <StyledBox>
          <HomeworkItem
            dataHomeWorkByLectureAndTraining={card!}
            dataUserId={dataUserId!}
          />
          <Comments homeworkId={card.id}>
            <CommentsPagination />
          </Comments>
        </StyledBox>
      </StyledDialogContent>
    </Dialog>
  ));

  const handleShowModal = () => {
    showModal();
  };

  const handleHideModal = () => {
    hideModal();
  };

  return (
    <StyledPaper
      isCurrentHomeworkActive={isCurrentHomeworkActive}
      onClick={handleShowModal}
      elevation={4}
    >
      <StyledCardHeader isCurrentHomeworkActive={isCurrentHomeworkActive}>
        <Typography textTransform="uppercase" variant="subtitle2">
          {getFormattedId(training?.techStack, id)}
        </Typography>
        <Typography variant="body2">
          {card.creationDate &&
            format(parseISO(card.creationDate), "dd.MM.yyyy")}
        </Typography>
      </StyledCardHeader>
      <StyledBox>
        <Typography variant="body2">{lecture?.subject}</Typography>
        <StyledUserRowStack>
          {mentor && (
            <UserRow
              icon={MentorIcon}
              user={mentor}
              width={24}
              height={24}
              variant="body2"
              userId={mentor.id}
              hasLink
            />
          )}
          {student && (
            <UserRow
              icon={StudentIcon}
              user={student}
              width={26}
              height={26}
              variant="body2"
              userId={student.id}
              hasLink
            />
          )}
        </StyledUserRowStack>
      </StyledBox>
    </StyledPaper>
  );
};

export default Card;
