export interface AuthFormProps<T> {
  type: "login" | "registration";
  onSubmit: (values: T) => void;
}

export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  passwordTwo?: string;
  email: string;
  phoneNumber: string;
}

export interface AuthData {
  login: string;
  password: string;
}
