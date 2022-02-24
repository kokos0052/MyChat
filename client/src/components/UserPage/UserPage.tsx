import { useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { GET_USER } from "../graphql/authQueries";
import { userInfoVar } from "../state/cache";
import UserProfile from "../UserProfile/UserProfile";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100%",
    background: "#000",
    position: "relative",
  },
  profile: {
    position: "absolute",
  },
});

function UserPage() {
  const classes = useStyles();
  const userID = localStorage.getItem("userID");
  const { data: userData } = useQuery(GET_USER, {
    variables: {
      id: userID,
    },
  });

  useEffect(() => {
    if (userData && userData.getUser) {
      userInfoVar({ ...userData.getUser });
    }
  }, [userData]);

  return (
    <div className={classes.root}>
        <div className={classes.profile}>
            <UserProfile />
        </div>
    </div>
     );
}

export default UserPage;
