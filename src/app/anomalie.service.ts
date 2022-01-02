import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Anomalie } from './models/anomalie';

@Injectable({
  providedIn: 'root'
})
export class AnomalieService {
  private apiServer = 'http://localhost:8080/anomalie';
  constructor(private httpClient : HttpClient, private router : Router) { }


  
  getAllAnomaliesByResource(resource: any) {
    return this.httpClient.get<Anomalie[]>(this.apiServer + '/all' ,resource);
  }

  getAnomalieById(id: number) {
    return this.httpClient.get<Anomalie>(this.apiServer + '/find/' + id);
  }

  addAnomalie(description : string, resourceId : number, isTreated : boolean = false, userId : number = 0) {
    let anomalie = {
      description : description,
      isTreated : isTreated,
    }
    return this.httpClient.post<Anomalie>(this.apiServer + '/add/' + resourceId + '/' + userId, anomalie);
  }
  
  deleteAnomalieById(id: number) {
    return this.httpClient.delete<Anomalie>(this.apiServer + '/delete/' + id);
  }

  deleteAnomalieByResource(resource: any) {
    return this.httpClient.delete<unknown>(this.apiServer + '/delete/', resource);
  }

  updateAnomalie(id : number, treated : boolean) {
    return this.httpClient.put<Anomalie>(this.apiServer + '/update/' + id + '/' + treated, null);
  }
}
