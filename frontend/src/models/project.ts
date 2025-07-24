export interface Project {
  id?: string;
  title: string;
  description: string;
  creator: string;
  developers?: string[];
  tasks?: string[];
  updatedAt?: string;
  createdAt?: string;
}
