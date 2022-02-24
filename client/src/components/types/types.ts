export interface AuthErrors {
  showUsernameError?: Boolean;
  showEmailError: Boolean;
  showPasswordError: Boolean;
}

export type User = {
  username: String,
  email: String,
}
