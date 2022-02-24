import {
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import colors from "../common/colors";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    background: colors.actionColor,
    display: "flex",
    justifyContent: "space-between",
    height: "100vh",
    position: "relative",
  },
  halfPart: {
    height: "100%",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "#fff",
    fontSize: "22px",
    "& h1": {
      margin: '20px 0px',
    },
    "& p": {
      maxWidth: 350,
      margin: '20px 0px',
      textAlign: 'center',
    },
    "& button": {
      width: 200,
      height: 50,
      border: '1px solid #fff',
      color: '#fff',
      fontWeight: '700',
      fontSize: '16px',
      borderRadius: '20px',
      margin: '20px 0px 0px 0px'
    }
  },
  signIn: {},
  signUp: {},
  button: {
    height: 40,
    width: 150,
    background: `${colors.actionColor} !important`,
    fontWeight: 700,
    marginTop: "20px !important",
  },
});

function Auth() {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState<Boolean>(true);

  return (
    <div className={classes.root}>
      <div className={`${classes.signIn} ${classes.halfPart}`}>
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please login with your personal info</p>
        <Button onClick={() => setIsLogin(true)}>Sign In</Button>
      </div>
      <div className={`${classes.signUp} ${classes.halfPart}`}>
        <h1>Hello friend!</h1>
        <p>Enter your personal details and start journey with us</p>
        <Button onClick={() => setIsLogin(false)}>Sign Up</Button>
      </div>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
}

export default Auth;
