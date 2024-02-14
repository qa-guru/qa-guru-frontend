import { ReactComponent as FacebookIcon } from "assets/icons/facebook.svg";
import { ReactComponent as YouTubeIcon } from "assets/icons/youtube.svg";
import { ReactComponent as InstagramIcon } from "assets/icons/instagram.svg";
import { ReactComponent as TelegramIcon } from "assets/icons/telegram.svg";
import { ReactComponent as VkIcon } from "assets/icons/vk.svg";
import { ReactComponent as LinkedInIcon } from "assets/icons/linked-in.svg";
import { ComponentType } from "react";

export const socialIcons = [
  {
    id: "facebook",
    component: FacebookIcon,
    url: "https://www.facebook.com/QA.guru.education/",
  },
  {
    id: "youtube",
    component: YouTubeIcon,
    url: "https://www.youtube.com/c/QAGURU",
  },
  {
    id: "instagram",
    component: InstagramIcon,
    url: "https://www.instagram.com/qa.guru_/",
  },
  { id: "telegram", component: TelegramIcon, url: "https://t.me/qa_guru_chat" },
  { id: "vk", component: VkIcon, url: "https://vk.com/qa.guru" },
  {
    id: "linkedin",
    component: LinkedInIcon,
    url: "https://me.linkedin.com/company/qa-guru",
  },
];

export interface ISocialIcon {
  icon: ComponentType;
}
