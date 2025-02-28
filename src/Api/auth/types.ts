export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  signIn: {
    token: string;
    user: {
      id: string;
      name: string;
    };
  };
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  signUp: {
    token: string;
    user: {
      id: string;
      name: string;
    };
  };
}
