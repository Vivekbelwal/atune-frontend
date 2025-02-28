import axios, { AxiosError } from "axios";

export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.data) {
      const data = axiosError.response.data as { message?: string };
      return data.message || "API Error";
    }
  }

  return error.message ?? "Network Error";
};

export const handleGraphqlResponse = (response: any): any => {
  if (response.errors) {
    const errorMessage = response.errors
      .map((error: any) => error.message)
      .join(", ");
    throw new Error(errorMessage);
  }
  return response.data;
};
