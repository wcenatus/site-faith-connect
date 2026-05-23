export type CreateAccountFieldErrors = Partial<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

export type CreateAccountValues = {
  name: string;
  email: string;
};

export type CreateAccountState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: CreateAccountFieldErrors;
  values: CreateAccountValues;
};

export const EMPTY_CREATE_ACCOUNT_VALUES: CreateAccountValues = {
  name: "",
  email: "",
};

export const INITIAL_CREATE_ACCOUNT_STATE: CreateAccountState = {
  status: "idle",
  message: "",
  errors: {},
  values: EMPTY_CREATE_ACCOUNT_VALUES,
};
