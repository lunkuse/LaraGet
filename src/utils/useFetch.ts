import { AxiosResponse } from "axios";
import axios from "../axios";

export type ApiMethod = "get" | "post" | "delete" | "patch";

export type Params = { [key: string]: unknown };

export type Data = { [key: string]: unknown };

export type Pagination<T> = Omit<Paginated<T>, "data" | "links">;

export type Request = {
  url: string;
  method: ApiMethod;
  data?: Params | Data;
  cancelToken?: string
};

const useFetch = async <T>({
  url,
  method,
  data,
  cancelToken
}: Request): Promise<ApiResponse<T>> => {
  const _data = data ?? {};
  try {
    let response: AxiosResponse<any, any>;
    if (method === "post") {
      response = await axios.post(url, _data, {cancelToken});
    } else {
      const params = generateParams(_data);
      response = await axios.get(`${url}${params}`);
    }
    const { status, payload, error, message } = response!.data;

    if (status === "SUCCESS" || status === true) {
      return { success: true, payload: payload, message: message ?? "" };
    }
    throw new Error(error ?? payload);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const generateParams = (params: Record<string, unknown>) => {
  let data = "?";
  for (let key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      if (params[key]) {
        data = data + `${key}=${params[key]}&`;
      }
    }
  }
  return data.slice(0, -1);
};

export { useFetch };
