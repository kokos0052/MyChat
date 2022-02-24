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
import { CREATE_USER, LOGIN_USER } from "../graphql/authQueries";


const useStyles = makeStyles({
  registerWrapper: {
    background: colors.background,
    height: "100vh",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    color: "#fff",
    position: "absolute",
    top: 0,
    right: 0,
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
    background: `${colors.inputBgColor}`,
  },
  registerButton: {
    height: 50,
    width: 200,
    color: "#fff !important",
    border: "none !important",
    background: `${colors.actionColor} !important`,
    borderRadius: "20px !important",
    fontSize: "16px !important",
  },
});

function Register() {
  const [username, setUsername] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [signUpErrors, setSignUpErrors] = useState<AuthErrors>({
    showUsernameError: false,
    showEmailError: false,
    showPasswordError: false,
  });
  const navigate = useNavigate();
  const [singup] = useMutation(CREATE_USER, {
    variables: {
      user: {
        email,
        username,
        password,
      },
    },
  });
  const [login] = useMutation(LOGIN_USER, {
    variables: {
      user: {
        email,
        password,
      },
    },
  });

  const classes = useStyles({});

  function validateEmail(email: String) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function signUpValidation(): Boolean {
    const errorCondition1 = username === "",
      errorCondition2 = email === "" || !validateEmail(email),
      errorCondition3 = password.length < 6;

    if (errorCondition1) {
      setSignUpErrors((errors) => {
        return {
          ...errors,
          showUsernameError: true,
        };
      });
    }
    if (errorCondition2) {
      setSignUpErrors((errors) => {
        return {
          ...errors,
          showEmailError: true,
        };
      });
    }
    if (errorCondition3) {
      setSignUpErrors((errors) => {
        return {
          ...errors,
          showPasswordError: true,
        };
      });
    }

    if (errorCondition1 || errorCondition2 || errorCondition3) {
      return true;
    }

    return false;
  }

  async function register() {
    await singup();
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
    <div className={classes.registerWrapper}>
      <FormControl classes={{ root: classes.form }} id="login-form">
        <h1 className={classes.formLabel}>Create Account</h1>
        <CustomInput
          placeholder="Username"
          value={username}
          error={signUpErrors.showUsernameError === true}
          onChange={(e) => {
            setUsername(e.target.value);
            setSignUpErrors({
              showUsernameError: false,
              showEmailError: false,
              showPasswordError: false,
            });
          }}
          helperText={signUpErrors.showUsernameError && "Incorrect Username"}
        />
        <CustomInput
          placeholder="Email"
          value={email}
          error={signUpErrors.showEmailError === true}
          onChange={(e) => {
            setEmail(e.target.value);
            setSignUpErrors({
              showUsernameError: false,
              showEmailError: false,
              showPasswordError: false,
            });
          }}
          helperText={signUpErrors.showUsernameError && "Incorrect Email"}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setSignUpErrors({
              showUsernameError: false,
              showEmailError: false,
              showPasswordError: false,
            });
          }}
          helperText={signUpErrors.showUsernameError && "Incorrect Password"}
          type={showPassword ? "text" : "password"}
          error={signUpErrors.showPasswordError === true}
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
            root: classes.registerButton,
          }}
          style={{
            fontWeight: 700,
          }}
          onClick={() => {
            if (signUpValidation()) {
              return;
            }
            register();
          }}
        >
          Sign Up
        </Button>
      </FormControl>
    </div>
  );
}

export default Register;
