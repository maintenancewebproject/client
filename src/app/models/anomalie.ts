import { Resource } from "./resource";

export interface Anomalie {
    id: number;
    resource : Resource; 
    description : String; 
    isTreated : boolean;
}