import { LightningBoltIcon, MixIcon } from "@radix-ui/react-icons";
import NavLink, { LinkProps } from "next/link";
import { Flex, Text } from ".";
import { useRouter } from "next/router";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

const uiLink = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  color: "$colors$gray9",
  textDecoration: "none",
  "&.active": { color: "$colors$text" },
};

const Link = ({
  title,
  href,
  icon: Icon,
}: {
  title: string;
  icon: typeof MixIcon;
} & LinkProps) => (
  <NavLink href={href}>
    <Flex css={uiLink}>
      <Icon width={30} height={30} />

      <Text size="1" css={{ color: "inherit" }}>
        {title}
      </Text>
    </Flex>
  </NavLink>
);

export const NavBar = () => {
  const isKeyboardOpen = useDetectKeyboardOpen();
  const { query } = useRouter();
  return (
    <Flex
      css={{
        position: isKeyboardOpen ? "static" : "sticky",
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
