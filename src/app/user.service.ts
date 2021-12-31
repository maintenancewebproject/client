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

  public getUsers() : Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + '/user/all');
  }

  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiServer + '/user/find/' + id);
  }

  public addUser(lastName : String , firstName : String, passWord : String, email : String, role : number): Observable<User[]> {
   let user = {
      lastName : lastName,
      firstName : firstName,
      passWord : passWord,
      email : email,
      role : role
    }
    return this.httpClient.post<User[]>(this.apiServer + '/user/add', user);
  }

  public updateUser(lastName : String , firstName : String, id: number, email : String, role : number): Observable<unknown> {
    let user = {
      id : id,
      lastName : lastName,
      firstName : firstName,
      email : email,
      role : role
    }
    return this.httpClient.put<unknown>(this.apiServer + '/user/update', user);
  }

  public deleteUser(id: number): Observable<unknown> {
    return this.httpClient.delete<unknown>(this.apiServer + '/user/delete/' + id);
  }
}

