import { ComponentProps, forwardRef } from "react";
import { TextField } from "./TextField";

export const NumberField = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof TextField>
>((props, ref) => (
  <TextField
    ref={ref}
    size="2"
    inputMode="numeric"
    pattern="[0-9]*"
    placeholder="0"
    {...props}
  />
));

NumberField.displayName = "NumberField";
