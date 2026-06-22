export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T[];
  meta: {
    timestamp: string;
    path?: string;
    pagination: PaginationMeta;
  };
  error: any;
}

export interface Translation {
  en: string;
  ru: string;
  uz: string;
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}
