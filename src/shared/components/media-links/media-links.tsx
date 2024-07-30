import { FC } from "react";

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
import { Maybe, UserDto } from "api/graphql/generated/graphql";
import CustomLink from "shared/components/custom-link";

import { StyledIconStack } from "./media-links.styled";
import { IMediaLinks, IconLinkProps } from "./media-links.types";

const mediaIcons = [
  {
    key: "stackOverflow",
    icon: StackOverflowIcon,
    iconSecondary: StackOverflowIconSecondary,
  },
  { key: "git", icon: GitHubIcon, iconSecondary: GitHubIconSecondary },
  { key: "linkedin", icon: LinkedInIcon, iconSecondary: LinkedInIconSecondary },
  {
    key: "telegram",
    icon: TelegramIcon,
    iconSecondary: TelegramIconSecondary,
    prefix: "https://t.me/",
  },
  { key: "website", icon: WebSiteIcon, iconSecondary: WebSiteIconSecondary },
];

const constructHref = (
  key: string,
  link: Maybe<string>,
  prefix?: string
): string | null => {
  if (!link) return null;
  const regex = /^@/;
  if (key === "telegram" && regex.test(link)) {
    return `${prefix}${link.replace(regex, "")}`;
  }
  return link;
};

const IconLink: FC<IconLinkProps> = ({
  href,
  icon: Icon,
  iconSecondary: IconSecondary,
}) => {
  if (href) {
    return (
      <CustomLink path={href}>
        <Icon />
      </CustomLink>
    );
  } else {
    return <IconSecondary />;
  }
};

const MediaLinks: FC<IMediaLinks> = ({ user }) => {
  return (
    <StyledIconStack>
      {mediaIcons.map(({ key, icon, iconSecondary, prefix }) => {
        const link = user?.[key as keyof UserDto];
        const href = constructHref(key, link, prefix);

        return (
          <IconLink
            key={key}
            href={href}
            icon={icon}
            iconSecondary={iconSecondary}
          />
        );
      })}
    </StyledIconStack>
  );
};

export default MediaLinks;
