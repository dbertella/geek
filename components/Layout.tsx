import { FC } from "react";
import { Box } from "./Box";

export const Layout: FC = ({ children }) => (
  <Box
    css={{
      p: "$2",
      m: "0 auto",
      maxWidth: 450,
      minHeight: "calc(100vh - 50px)",
    }}
  >
    {children}
  </Box>
);
