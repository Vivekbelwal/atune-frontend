import { handleGraphqlResponse } from "../common/apiHelpers";
import httpClient from "../httpClient";
import { GetCurrentUserResponse, GetUserResponse } from "./types";

export const GetUser = async (id: string): Promise<GetUserResponse> => {
  const query = `
    query GetUser($id: String!) {
      user(id: $id) {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  `;
  const variables = { id };
  const response = await httpClient.post("/graphql", { query, variables });
  return handleGraphqlResponse(response.data);
};

export const GetCurrentUser = async (): Promise<GetCurrentUserResponse> => {
  const query = `
    query GetCurrentUser {
      me {
        id
        name
        email
        createdAt
        updatedAt
        avatarId
        avatar {
          id
          url
        }
      }
    }
  `;
  const response = await httpClient.post("/graphql", { query });
  return handleGraphqlResponse(response.data);
};

export const UpdateUser = async (input: any): Promise<any> => {
  const query = `
    mutation UpdateUser($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        name
        avatarId
        avatar {
          id
          url
        }
      }
    }
  `;
  const variables = { input };
  const response = await httpClient.post("/graphql", { query, variables });
  return handleGraphqlResponse(response.data);
};
