import { styled } from "../stitches.config";
import { Box } from "./Box";

export const Heading = styled("h2", Box, {
  margin: 0,
  variants: {
    variant: {
      h1: {
        fontSize: "60px",
        lineHeight: "72px",
        fontWeight: "bold",
        letterSpacing: "-0.02em",
      },
      h2: {
        fontSize: "48px",
        lineHeight: "60px",
        fontWeight: "bold",
        letterSpacing: "-0.02em",
      },
      h3: {
        fontSize: "36px",
        lineHeight: "48px",
        fontWeight: "bold",
        letterSpacing: "-0.02em",
      },
      h4: {
        fontSize: "30px",
        lineHeight: "36px",
        fontWeight: "bold",
        letterSpacing: "-0.02em",
      },
      h5: {
        fontSize: "24px",
        lineHeight: "30px",
        fontWeight: "bold",
        letterSpacing: "-0.02em",
      },
      h6: {
        fontSize: "20px",
        lineHeight: "24px",
        fontWeight: "bold",
      },
    },
  },
  defaultVariants: {
    variant: "h2",
  },
});
