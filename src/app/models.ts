export interface Task {
  title: string;
  description?: string;
  category: string;
  completed?: boolean;
}

export interface Category {
  id: string;
  name: string;
}
