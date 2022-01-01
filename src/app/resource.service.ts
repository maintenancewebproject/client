import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from './models/resource';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiServer = 'http://localhost:8080/resource';
  constructor(private httpClient : HttpClient, private router : Router) { }

  getAllResourcesByUser(userId:number) {
    return this.httpClient.get<any[]>(this.apiServer + '/all/' + userId);
  }

  getResourceById(id: number) {
    return this.httpClient.get<any>(this.apiServer + '/find/' + id);
  }

  addResource(localisation : string, description : string, id : number) {
    let resource = {
      localisation : localisation,
      description : description,
    }
    return this.httpClient.post<Resource>(this.apiServer + '/add/' + id, resource);
  }

  updateResource(localisation : string, description : string, id : number) {
    let resource = {
      id : id,
      localisation : localisation,
      description : description
    }
    return this.httpClient.put<Resource>(this.apiServer + '/update', resource);
  }

  deleteResource(id: number) {
    return this.httpClient.delete<Resource>(this.apiServer + '/delete/' + id);
  }
}


