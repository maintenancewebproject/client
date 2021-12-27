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

  getAllResourcesByUser(user: any) {
    return this.httpClient.get<Resource[]>(this.apiServer + '/all' ,user);
  }

  getResourceById(id: number) {
    return this.httpClient.get<Resource>(this.apiServer + '/find/' + id);
  }

  createResource(resource: Resource) {
    return this.httpClient.post<Resource>(this.apiServer + '/add', resource);
  }

  updateResource(resource: Resource) {
    return this.httpClient.put<Resource>(this.apiServer + '/update', resource);
  }

  deleteResource(id: number) {
    return this.httpClient.delete<Resource>(this.apiServer + '/delete/' + id);
  }
}


