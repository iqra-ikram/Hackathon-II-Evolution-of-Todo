export interface Task {
  id: string;
  title: string;
  description?: string | null;
  is_completed: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  is_completed?: boolean;
}
