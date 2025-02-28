import { handleGraphqlResponse } from "../common/apiHelpers";
import httpClient from "../httpClient";
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "./types";

export const Login = async (data: LoginRequest): Promise<LoginResponse> => {
  const query = `
    mutation SignIn($email: String!, $password: String!) {
      signIn(input: { email: $email, password: $password }) {
        token
        user {
          createdAt
          email
          id
          name
          updatedAt
        }
      }
    }
  `;
  const variables = {
    email: data.email,
    password: data.password,
  };
  const response = await httpClient.post("/graphql", { query, variables });
  return handleGraphqlResponse(response.data);
};

export const SignUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const query = `
    mutation SignUp($name: String!, $email: String!, $password: String!) {
      signUp(input: { name: $name, email: $email, password: $password }) {
        token
        user {
          createdAt
          email
          id
          name
          updatedAt
        }
      }
    }
  `;
  const variables = {
    name: data.name,
    email: data.email,
    password: data.password,
  };
  const response = await httpClient.post("/graphql", { query, variables });
  return handleGraphqlResponse(response.data);
};
