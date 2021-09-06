export interface TasksResponse {
    tasksData: TasksData;
  }
  export interface TasksData {
    kind: string;
    etag: string;
    items?: (TaskItemsEntity)[] | null;
  }
  export interface TaskItemsEntity {
    kind: string;
    id: string;
    etag: string;
    title: string;
    updated: string;
    selfLink: string;
    position: string;
    status: string;
    due?: string | null;
  }
  