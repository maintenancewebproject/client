import { Role } from "./role";
import { Resource } from "./resource";

export interface User {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    role: number;
    resource: Resource[];
}
