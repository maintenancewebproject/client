import { Role } from "./role";
import { Resource } from "./resource";

export interface User {
    id: number | 0;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    role: number;
    resource: Resource[] | null;
}
