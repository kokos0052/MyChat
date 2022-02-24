import { Button, FormControl, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import colors from "../common/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import CustomInput from "../common/CustomInput";
import { AuthErrors } from "../types/types";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../graphql/authQueries";

const useStyles = makeStyles({
  loginWrapper: {
    background: colors.background,
    height: "100vh",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    color: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
  },
  form: {
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formLabel: {
    color: "#fff",
    fontSize: "2em",
  },
  formIconButton: {
    color: `${colors.inputTxtColor} !important`,
  },
  loginButton: {
    height: 50,
    width: 200,
    color: "#fff !important",
    border: "none !important",
    background: `${colors.actionColor} !important`,
    borderRadius: "20px !important",
    fontSize: "16px !important",
  },
});

function Login() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [singInErrors, setSingInErrors] = useState<AuthErrors>({
    showEmailError: false,
    showPasswordError: false,
  });
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_USER, {
    variables: {
      user: {
        email,
        password,
      },
    },
    onCompleted({ login }) {
      console.log(login);
    }
  });

  const classes = useStyles();

  function validateEmail(email: String) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function signInValidation(): Boolean {
    const errorCondition1 = email === "" || !validateEmail(email),
      errorCondition2 = password.length < 6;
    if (errorCondition1) {
      setSingInErrors((errors) => {
        return {
          ...errors,
          showEmailError: true,
        };
      });
    }
    
    if (errorCondition2) {
      setSingInErrors((errors) => {
        return {
          ...errors,
          showPasswordError: true,
        };
      });
    }

    if (errorCondition1 || errorCondition2) {
      return true;
    }

    return false;
  }

  async function singIn() {
    const loginData = await login();
    const token = loginData.data.loginUser.token;
    const userID = loginData.data.loginUser.id;
    if (token) {
      localStorage.setItem("token", token);
      navigate("../mypage");
    }
    if (userID) {
      localStorage.setItem("userID", userID);
    }
  }

  return (
    <div className={classes.loginWrapper}>
      <FormControl classes={{ root: classes.form }} id="login-form">
        <h1 className={classes.formLabel}>Sign in</h1>
        <CustomInput
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSingInErrors({
              showEmailError: false,
              showPasswordError: false,
            });
          }}
          error={singInErrors.showEmailError === true}
          helperText={singInErrors.showEmailError && "Incorrect Email"}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setSingInErrors({
              showEmailError: false,
              showPasswordError: false,
            });
          }}
          type={showPassword ? "text" : "password"}
          error={singInErrors.showPasswordError === true}
          helperText={singInErrors.showPasswordError && "Incorrect Password"}
          sx={{
            "& .MuiOutlinedInput-root": {
              paddingRight: 0,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  backgroundColor: colors.inputBgColor,
                  padding: "27.5px 14px",
                  margin: 0,
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                  classes={{
                    root: classes.formIconButton,
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          classes={{
            root: classes.loginButton,
          }}
          style={{
            fontWeight: 700,
          }}
          onClick={() => {
            if (signInValidation()) {
              return;
            }
            singIn();
          }}
        >
          Sign In
        </Button>
      </FormControl>
    </div>
  );
}

export default Login;
