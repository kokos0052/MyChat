import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import colors from "./colors";

const useStyles = makeStyles((theme) => ({
  input: {
    background: `${colors.inputBgColor} !important`,
    color: `${colors.textColor} !important`,
  },
  textarea: {
    background: `${colors.inputBgColor} !important`,
    width: 300,
    height: 50,
    marginBottom: '35px !important',
  },
}));

const CustomInput = React.forwardRef(function CustomInput(
  props: TextFieldProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const classes = useStyles();

  return (
    <>
      <TextField
        {...props}
        ref={ref}
        color="primary"
        variant="outlined"
        inputProps={{
          className: classes.input,
        }}
        className={classes.textarea}
      />
    </>
  );
});

export default CustomInput;
