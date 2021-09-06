export interface TaskListsResponse {
    listsData: TaskLists;
}

export interface TaskLists {
    kind:  string;
    etag:  string;
    items: Item[];
}

export interface Item {
    kind:     string;
    id:       string;
    etag:     string;
    title:    string;
    updated:  Date;
    selfLink: string;
}
