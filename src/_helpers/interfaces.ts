export interface UserRegisterI {
  userName: string;
  password: string;
}

export interface UserLoginI {
  userName: string;
  password: string;
}

export interface UserI {
  userName: string;
  password: string;
  isAdmin: boolean;
  comments: string;
  favorites: string;
  visited: string;
}
