import {
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NavMenu from "./NavMenu";
import colors from "./common/colors";

const useStyles = makeStyles({
  root: {
    background: colors.background,
    height: "100vh",
  },
  formWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 150,
  },
  form: {
    height: 500,
    width: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: `2px solid ${colors.borderColor}`,
    borderRadius: 20,
    fontSize: "22px",
    color: colors.textColor,
  },
  textarea: {
    border: `2px solid ${colors.borderColor}`,
    marginBottom: "20px",
    borderRadius: "20px",
    height: "40px",
    width: "250px",
    paddingLeft: "10px",
    "&:after": {
      borderBottom: "none !important",
    },
    "&:before": {
      borderBottom: "none !important",
    },
  },
  focused: {
    border: `2px solid ${colors.actionColor}`,
  },
  input: {
    color: `${colors.textColor} !important`,
  },
  label: {
    color: `${colors.textColor} !important`,
    paddingTop: "8px !important",
  },
  focusedLabel: {
    color: `${colors.actionColor} !important`,
  },
  button: {
    height: 40,
    width: 150,
    background: `${colors.actionColor} !important`,
    fontWeight: 700,
    marginTop: "20px !important",
  },
});

function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavMenu />
      <div className={classes.formWrapper}>
        <div className={classes.form}>
          <p>Login</p>
          <FormControl>
            <InputLabel
              htmlFor="user-name"
              classes={{
                root: classes.label,
                focused: classes.focusedLabel,
              }}
            >
              Name
            </InputLabel>
            <Input
              id="user-name"
              classes={{
                root: classes.textarea,
                focused: classes.focused,
                input: classes.input,
              }}
            />
          </FormControl>
          <FormControl>
            <InputLabel
              htmlFor="user-name"
              classes={{
                root: classes.label,
                focused: classes.focusedLabel,
              }}
            >
              Password
            </InputLabel>
            <Input
              classes={{
                root: classes.textarea,
                focused: classes.focused,
                input: classes.input,
              }}
              type="password"
            />
          </FormControl>
          <Button className={classes.button} variant="contained">
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
