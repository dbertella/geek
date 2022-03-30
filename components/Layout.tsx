import { FC } from "react";
import { Flex } from "./Flex";

export const Layout: FC = ({ children }) => (
  <Flex
    css={{
      p: "$2",
      m: "0 auto",
      maxWidth: 450,
      minHeight: "calc(100vh - 50px)",
    }}
    direction="column"
    gap="2"
  >
    {children}
  </Flex>
);
