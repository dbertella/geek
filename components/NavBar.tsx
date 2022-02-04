import { LightningBoltIcon, MixIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
// import useDetectKeyboardOpen from "use-detect-keyboard-open";
import NavLink, { LinkProps } from "next/link";
import { Flex, Box, Text } from ".";
import { useRouter } from "next/router";

const UiLink = styled(Box, {
  textAlign: "center",
  flex: 1,
  color: "$colors$gray9",
  textDecoration: "none",
  "&.active": { color: "$colors$text" },
});

const Link = ({
  title,
  href,
  icon: Icon,
}: {
  title: string;
  icon: typeof MixIcon;
} & LinkProps) => (
  <NavLink href={href}>
    <UiLink>
      <Icon width={30} height={30} />

      <Text size="1" css={{ color: "inherit" }}>
        {title}
      </Text>
    </UiLink>
  </NavLink>
);

export const NavBar = () => {
  // const isKeyboardOpen = useDetectKeyboardOpen(); TODO figure out what to do with nexjs
  const { query } = useRouter();
  return (
    <Flex
      css={{
        position: "sticky",
        bottom: 0,
        height: 50,
        background: "rgba(255,255,255,0.7)",
      }}
    >
      <Link
        href={{
          pathname: "/[slug]",
          query,
        }}
        icon={LightningBoltIcon}
        title="Collection"
      />
      <Link
        href={{
          pathname: "/[slug]/plays",
          query,
        }}
        icon={MixIcon}
        title="Plays"
      />
    </Flex>
  );
};
