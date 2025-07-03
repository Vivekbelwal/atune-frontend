import { handleGraphqlResponse } from "../common/apiHelpers";
import httpClient from "../httpClient";

export const UploadFile = async (
  file: File,
  fileType: string = "avatar"
): Promise<any> => {
  const formData = new FormData();

  const operations = JSON.stringify({
    query: `
      mutation UploadFile($input: UploadFileInput!) {
        uploadFile(input: $input) {
          id
          url
          type
          userId
        }
      }
    `,
    variables: {
      input: {
        file: null,
        fileType: fileType,
      },
    },
  });

  const map = JSON.stringify({
    "0": ["variables.input.file"],
  });

  formData.append("operations", operations);
  formData.append("map", map);
  formData.append("0", file);

  const response = await httpClient.post("/graphql", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return handleGraphqlResponse(response.data);
};
