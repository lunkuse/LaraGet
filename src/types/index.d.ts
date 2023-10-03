export * from "./Product"

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  payload?: T;
  success_code?: number;
  error_code?: number;
}

export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface Paginated<D> {
  current_page: number;
  data: D[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
  links: Link[];
}
