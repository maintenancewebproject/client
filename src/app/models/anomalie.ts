import { Resource } from "./resource";
import { User } from "./user";

export interface Anomalie {
    id: number;
    resource : Resource; 
    description : string; 
    isTreated : boolean;
    user : User;
}