import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const BackButton = () => (
  <Link href="/" passHref>
    <ArrowLeftIcon width={30} height={30} />
  </Link>
);
