import { styled } from "../stitches.config";

export const InputBase = styled("input", {
  // Reset
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  fontFamily: "inherit",
  margin: "0",
  outline: "none",
  padding: "0",
  width: "100%",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },

  // Custom
  backgroundColor: "$background",
  boxShadow: "inset 0 0 0 1px $colors$gray7",
  color: "$text",
  fontVariantNumeric: "tabular-nums",

  "&:-webkit-autofill": {
    boxShadow: "inset 0 0 0 1px $colors$blue, inset 0 0 0 100px $colors$blue",
  },

  "&:-webkit-autofill::first-line": {
    fontFamily: "$untitled",
    color: "$text",
  },

  "&:focus": {
    boxShadow:
      "inset 0px 0px 0px 1px $colors$blue, 0px 0px 0px 1px $colors$blue",
    "&:-webkit-autofill": {
      boxShadow:
        "inset 0px 0px 0px 1px $colors$blue, 0px 0px 0px 1px $colors$blue, inset 0 0 0 100px $colors$blue",
    },
  },
  "&::placeholder": {
    color: "$gray9",
  },
  "&:disabled": {
    pointerEvents: "none",
    backgroundColor: "$gray2",
    color: "$gray8",
    cursor: "not-allowed",
    "&::placeholder": {
      color: "$gray7",
    },
  },
  "&:read-only": {
    backgroundColor: "$gray2",
    "&:focus": {
      boxShadow: "inset 0px 0px 0px 1px $colors$gray7",
    },
  },

  variants: {
    size: {
      "1": {
        height: "$5",
        fontSize: "$1",
        px: "$1",
        lineHeight: "$sizes$5",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
      "2": {
        height: "$9",
        width: "$9",
        fontSize: "$7",
        textAlign: "center",
        px: "$2",
        lineHeight: "$sizes$6",
        "&:-webkit-autofill::first-line": {
          fontSize: "$3",
        },
      },
    },
    variant: {
      bold: {
        fontWeight: 700,
      },
      ghost: {
        boxShadow: "none",
        backgroundColor: "transparent",
        "@hover": {
          "&:hover": {
            boxShadow: "inset 0 0 0 1px $colors$gray7",
          },
        },
        "&:focus": {
          backgroundColor: "$background",
          boxShadow:
            "inset 0px 0px 0px 1px $colors$blue, 0px 0px 0px 1px $colors$blue",
        },
        "&:disabled": {
          backgroundColor: "transparent",
        },
        "&:read-only": {
          backgroundColor: "transparent",
        },
      },
    },
    state: {
      invalid: {
        boxShadow: "inset 0 0 0 1px $colors$red9",
        "&:focus": {
          boxShadow:
            "inset 0px 0px 0px 1px $colors$red9, 0px 0px 0px 1px $colors$red9",
        },
      },
      valid: {
        boxShadow: "inset 0 0 0 1px $colors$green",
        "&:focus": {
          boxShadow:
            "inset 0px 0px 0px 1px $colors$green, 0px 0px 0px 1px $colors$green",
        },
      },
    },
    cursor: {
      default: {
        cursor: "default",
        "&:focus": {
          cursor: "text",
        },
      },
      text: {
        cursor: "text",
      },
    },
  },
  defaultVariants: {
    size: "1",
  },
});
