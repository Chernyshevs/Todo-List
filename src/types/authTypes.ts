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

export interface RefreshToken {
  refreshToken: string;
}

export interface Token {
  access: string;
  refresh: string;
}

type Role = "ADMIN" | "USER" | "MODERATOR";

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}
