import { FC } from "react";
import { Maybe } from "api/graphql/generated/graphql";
import { ReactComponent as StackOverflowIcon } from "assets/icons/stack-overflow.svg";
import { ReactComponent as GitHubIcon } from "assets/icons/git-hub.svg";
import { ReactComponent as LinkedInIcon } from "assets/icons/linked-in.svg";
import { ReactComponent as TelegramIcon } from "assets/icons/telegram.svg";
import { ReactComponent as WebSiteIcon } from "assets/icons/website.svg";
import { ReactComponent as StackOverflowIconSecondary } from "assets/icons/stack-overflow-secondary.svg";
import { ReactComponent as GitHubIconSecondary } from "assets/icons/git-hub-secondary.svg";
import { ReactComponent as LinkedInIconSecondary } from "assets/icons/linked-in-secondary.svg";
import { ReactComponent as TelegramIconSecondary } from "assets/icons/telegram-secondary.svg";
import { ReactComponent as WebSiteIconSecondary } from "assets/icons/website-secondary.svg";

import { StyledIconStack, StyledLink } from "../media-links/media-links.styled";
import { IMediaLinks } from "./media-links.types";

const MediaLinks: FC<IMediaLinks> = ({ user }) => {
  const transformLink = (telegramLink?: Maybe<string>) => {
    if (user?.telegram) {
      const regex = /^@/;
      return telegramLink?.replace(regex, "https://t.me/");
    }
    return null;
  };

  const telegramLink = transformLink(user?.telegram);

  return (
    <StyledIconStack>
      {user?.stackOverflow ? (
        <StyledLink href={user?.stackOverflow}>
          <StackOverflowIcon />
        </StyledLink>
      ) : (
        <StackOverflowIconSecondary />
      )}
      {user?.git ? (
        <StyledLink href={user?.git}>
          <GitHubIcon />
        </StyledLink>
      ) : (
        <GitHubIconSecondary />
      )}
      {user?.linkedin ? (
        <StyledLink href={user?.linkedin}>
          <LinkedInIcon />
        </StyledLink>
      ) : (
        <LinkedInIconSecondary />
      )}
      {user?.telegram ? (
        <StyledLink href={telegramLink!}>
          <TelegramIcon />
        </StyledLink>
      ) : (
        <TelegramIconSecondary />
      )}
      {user?.website ? (
        <StyledLink href={user?.website}>
          <WebSiteIcon />
        </StyledLink>
      ) : (
        <WebSiteIconSecondary />
      )}
    </StyledIconStack>
  );
};

export default MediaLinks;
