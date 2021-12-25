import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServer = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  public getUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer + '/user/all');
  }

  public getUserById(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer + '/user/' + id);
  }

  public addUser(user: User): Observable<User[]> {
    return this.httpClient.post<User[]>(this.apiServer + '/user/add', user);
  }

  public updateUser(user: User): Observable<User[]> {
    return this.httpClient.put<User[]>(this.apiServer + '/user/update', user);
  }

  public deleteUser(id: number): Observable<unknown> {
    return this.httpClient.delete<unknown>(this.apiServer + '/user/delete/' + id);
  }
}

