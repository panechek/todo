import { EntityState } from "@reduxjs/toolkit";

export type Task = {
    id: number,
    text: string,
    listId: number,
    completed?: boolean,
}

export type TaskNew = {
    text: string,
    listId: number,
    completed?: boolean,
}

export interface TasksSLiceState extends EntityState<Task>{
    loading: boolean;
    error: boolean;
};