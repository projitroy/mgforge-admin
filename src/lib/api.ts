export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions extends Omit<RequestInit, "method" | "body"> {
  method?: ApiMethod;
  data?: unknown;
  query?: Record<string, string | number | boolean | null | undefined>;
  baseUrl?: string;
  body?: BodyInit | null;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const buildUrl = (
  path: string,
  query?: Record<string, string | number | boolean | null | undefined>,
  baseUrl = "",
) => {
  const url = new URL(path, baseUrl || window?.location?.origin || "");
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
};

const parseResponse = async (response: Response) => {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export async function apiRequest<T = any>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    data,
    query,
    baseUrl,
    headers = {},
    ...init
  } = options;

  const hasBody = data !== undefined && data !== null;
  const contentType = (headers as Record<string, unknown>)["Content-Type"];

  const body = init.body ?? (hasBody ? JSON.stringify(data) : undefined);
  const resolvedHeaders = {
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...headers,
  };

  const url = buildUrl(path, query, baseUrl);

  const response = await fetch(url, {
    method,
    headers: resolvedHeaders,
    body,
    ...init,
  });

  const responseData = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
      responseData,
    );
  }

  return responseData as T;
}

export const api = {
  get<T = any>(path: string, options?: Omit<ApiRequestOptions, "method" | "data">) {
    return apiRequest<T>(path, { ...options, method: "GET" });
  },
  post<T = any>(path: string, options?: Omit<ApiRequestOptions, "method">) {
    return apiRequest<T>(path, { ...options, method: "POST" });
  },
  put<T = any>(path: string, options?: Omit<ApiRequestOptions, "method">) {
    return apiRequest<T>(path, { ...options, method: "PUT" });
  },
  patch<T = any>(path: string, options?: Omit<ApiRequestOptions, "method">) {
    return apiRequest<T>(path, { ...options, method: "PATCH" });
  },
  delete<T = any>(path: string, options?: Omit<ApiRequestOptions, "method">) {
    return apiRequest<T>(path, { ...options, method: "DELETE" });
  },
};
