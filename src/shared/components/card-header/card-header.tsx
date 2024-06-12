import { FC } from "react";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import CustomLink from "shared/components/custom-link";
import useResponsive from "shared/hooks/use-responsive";

import { StyledCardHeader } from "./card-header.styled";
import { ICardHeader } from "./card-header.types";
import { formatId } from "../../helpers/format-id";

const CardHeader: FC<ICardHeader> = ({
  cardId,
  creationDate,
  techStack,
  isActive,
  route,
}) => {
  const { isLargeDesktop } = useResponsive();

  const headerTitle = (
    <Typography variant="subtitle2">{formatId(techStack, cardId)}</Typography>
  );

  const headerContent = (
    <>
      {isLargeDesktop ? (
        <CustomLink
          textDecorationHover="underline"
          path={`${route}/${cardId}`}
          color="black"
        >
          {headerTitle}
        </CustomLink>
      ) : (
        headerTitle
      )}
    </>
  );

  return (
    <StyledCardHeader isActive={isActive}>
      {headerContent}
      <Typography variant="body2">
        {creationDate && format(parseISO(creationDate), "dd.MM.yyyy")}
      </Typography>
    </StyledCardHeader>
  );
};

export default CardHeader;
