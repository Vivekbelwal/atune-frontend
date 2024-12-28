export interface Task {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface BoardState {
  [key: string]: Column;
}
