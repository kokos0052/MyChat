import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/styles";
import colors from "./colors";

const StyledButton = styled(Button)({
  fontWeight: 700,
  height: 50,
  width: 200,
  color: "#fff",
  border: "none",
  background: `${colors.actionColor}`,
  borderRadius: "20px",
  fontSize: "16px",
});

function CustomButton(text: String, props: ButtonProps) {
  return <StyledButton {...props}>{text}</StyledButton>;
}

export default CustomButton;
