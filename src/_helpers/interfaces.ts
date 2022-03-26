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
export interface CreateRuinI {
  name: string;
  location: string;
  description: string;
  images: string;
  score: number;
  comments: [];
}
