import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import UserPage from "./components/UserPage/UserPage";
import colors from "./components/common/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import RequireAuth from "./components/AuthRoute/RequireAuth";
import { cache } from "./components/state/cache";

const httpLink = createHttpLink({
  uri: "http://localhost:9000/gqlplayground",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const theme = createTheme({
  palette: {
    primary: {
      main: colors.inputTxtColor,
    },
    secondary: {
      main: colors.actionColor,
    },
    error: {
      main: colors.actionColor,
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route
              path="/mypage"
              element={
                <RequireAuth>
                  <UserPage />
                </RequireAuth>
              }
            />
          </Routes>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
