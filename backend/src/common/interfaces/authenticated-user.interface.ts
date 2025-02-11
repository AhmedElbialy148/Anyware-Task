export interface AuthenticatedUser {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthenticatedGuest {
  phoneNumber: string;
  role: string;
  iat: number;
  exp: number;
}
