import { styled } from "../stitches.config";

export const Text = styled("span", {
  // Reset
  lineHeight: "1",
  margin: "0",
  fontWeight: 400,
  fontVariantNumeric: "tabular-nums",
  display: "block",

  variants: {
    size: {
      "1": {
        fontSize: "$1",
      },
      "2": {
        fontSize: "$2",
      },
      "3": {
        fontSize: "$3",
      },
      "4": {
        fontSize: "$4",
      },
      "5": {
        fontSize: "$5",
        letterSpacing: "-.015em",
      },
      "6": {
        fontSize: "$6",
        letterSpacing: "-.016em",
      },
      "7": {
        fontSize: "$7",
        letterSpacing: "-.031em",
        textIndent: "-.005em",
      },
      "8": {
        fontSize: "$8",
        letterSpacing: "-.034em",
        textIndent: "-.018em",
      },
      "9": {
        fontSize: "$9",
        letterSpacing: "-.055em",
        textIndent: "-.025em",
      },
    },
    variant: {
      red: {
        color: "$red9",
      },
      blue: {
        color: "$blue",
      },
      green: {
        color: "$green",
      },
      gray: {
        color: "$gray1",
      },
      contrast: {
        color: "$text",
      },
    },
  },
  defaultVariants: {
    size: "3",
    variant: "contrast",
  },
});

export const Label = (props: any) => (
  <Text as="label" size="2" css={{ mb: "$1" }} {...props} />
);
