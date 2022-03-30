import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Flex } from "./Flex";
import { Text } from "./Text";

export const BackButton = () => (
  <Link href="/" passHref>
    <Flex align="center">
      <ArrowLeftIcon width={30} height={30} />
      <Text variant="number">BACK TO SEARCH</Text>
    </Flex>
  </Link>
);
