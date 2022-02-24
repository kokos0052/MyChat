import { InMemoryCache, makeVar } from "@apollo/client";
import { User } from "../types/types";

export const userInfoVar = makeVar<User>({
  username: "",
  email: "",
});

export const cache = new InMemoryCache({
  typePolicies: {
    userPage: {
      fields: {
        userInfo: {
          read() {
            return userInfoVar;
          },
        },
      },
    },
  },
});
