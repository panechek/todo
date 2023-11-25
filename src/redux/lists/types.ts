import { EntityState } from "@reduxjs/toolkit";
import { Task } from "../tasks/types";

export type List = {
    id: number,
    name: string,
    colorId: number,
}

export type ListNew = {
    name: string,
    colorId: number,
}

export type Color = {
    id: number,
    hex: string,
    name: string
}

export interface TodoData {
    lists: List[];
    tasks: Task[];
    colors: Color[];
}

export interface ListsSLiceState extends EntityState<List>{
        currentList: number | null;
        loading: boolean;
        error: boolean;
        colors: Color[];
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
