export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}

export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number; // сколько на странице
  offset?: number; // страницу
}

export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export type Roles = "ADMIN" | "MODERATOR" | "USER";
