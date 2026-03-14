/**
 * API response handling with Generics
 */

type APISuccess<T> = {
  status: "success";
  data: T;
};

type APIError = {
  status: "error";
  message: string;
};

type APIResponse<T> = APISuccess<T> | APIError;

const handleResponse = <T>(response: APIResponse<T>): void => {
  if (response.status === "success") {
    console.log("Data:", response.data);
  } else {
    console.error("Error:", response.message);
  }
};

const exampleApiResponse: APIResponse<unknown> = {
  status: "success",
  data: { id: 0, user: "daedalus-vis" },
};

const exampleApiResponse2: APIResponse<unknown> = {
  status: "error",
  message: "Something went wrong",
};

handleResponse(exampleApiResponse);
handleResponse(exampleApiResponse2);
