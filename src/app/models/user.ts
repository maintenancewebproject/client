import { Role } from "./role";
import { Resource } from "./resource";

export interface User {
    id: number | 0;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    role: Role;
    resource: Resource[] | null;
}
