import { List } from "../redux/lists/types";
import { Task } from "../redux/tasks/types";

export const isValidName = (name: string, array: List[]): List | undefined =>  array.find((i) => i.name === name);

export const isValidText = (text: string, array: Task[]): Task | undefined => array.find((i) => i.text === text);
    
export default isValidName;