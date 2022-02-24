import { useReactiveVar } from "@apollo/client";
import { makeStyles } from "@material-ui/core";
import { userInfoVar } from "../state/cache";
import { User } from "../types/types";

const useStyles = makeStyles({
  root: {
    color: "#fff",
    fontSize: 22,
    display: "flex",
    justifyContent: "center",
    alignItems: "left",
    flexDirection: "column",
    padding: "20px 30px",
    border: "1px solid #2a373d",
    width: 275,
    borderLeft: "none",
    borderTop: "none",
    "& p": {
      padding: "0px 0px 10px 0px",
      margin: 0,
    },
  },
  email: {
    color: "#5e5f61",
    fontSize: 16,
  },
});

function UserPage() {
  const userInfo: User = useReactiveVar(userInfoVar);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>{userInfo.username}</p>
      <p className={classes.email}>{userInfo.email}</p>
    </div>
  );
}

export default UserPage;
