export type LoginFieldErrors = Partial<{
  email: string;
  password: string;
}>;

export type LoginValues = {
  email: string;
};

export type LoginState = {
  status: "idle" | "error";
  message: string;
  errors: LoginFieldErrors;
  values: LoginValues;
};

export const EMPTY_LOGIN_VALUES: LoginValues = {
  email: "",
};

export const INITIAL_LOGIN_STATE: LoginState = {
  status: "idle",
  message: "",
  errors: {},
  values: EMPTY_LOGIN_VALUES,
};
