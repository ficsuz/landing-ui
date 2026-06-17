export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone?: string;
  role: 'admin' | 'teacher';
  createdAt?: string;
  updatedAt?: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  address: string;
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  courseId: string;
  teacherId: string;
  studentsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}
