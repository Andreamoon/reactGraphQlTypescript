export interface TaskData {
  id: number;
  title: string;
  completed: boolean;
  project_id: number;
  project: ProjectData;
}

export interface ProjectData {
  id: number;
  name: string;
}

export interface FetchTasks {
  fetchTasks: TaskData[];
}

export interface GetTask {
  getTask: TaskData;
}

export interface TaskInput {
  id: any;
  title: string;
  completed: Boolean;
  project_id: number;
}
