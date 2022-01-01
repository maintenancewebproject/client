import { Anomalie } from "./anomalie";
import { User } from "./user";

export interface Resource {
    id: number;
    anomalies: Anomalie[];
    description: string;
    user : User;
    localisation : string;
}