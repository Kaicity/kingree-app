export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Trang chủ",
      href: "/",
    },

    {
      label: "Ghép đôi",
      href: "/match",
    },
  ],
  navMenuItems: [
    {
      label: "Trang chủ",
      href: "/",
    },
    {
      label: "Ghép đôi",
      href: "/match",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
