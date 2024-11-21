import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ClientResponse } from '../models/client-response.model';
import { SortType } from '../models/sort-type.model';
import { ClientRequest } from '../models/client-reqest.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<ClientResponse[]> {
    return this.http.get<ClientResponse[]>(`${environment.apiBaseUrl}/Client`);
  }

  getClients(
    filter?: Record<string, any>,
    sort?: Record<string, SortType>,
    pageNumber?: number,
    pageSize?: number
  ): Observable<ClientResponse[]> {

    let params = new HttpParams();
  
    if (filter) {
      params = params.set('filter', JSON.stringify(filter));
    }
    if (sort) {
      params = params.set('sort', JSON.stringify(sort));
    }
    if (pageNumber) {
      params = params.set('pageNumber', pageNumber);
    }
    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }
  
    return this.http.get<ClientResponse[]>(`${environment.apiBaseUrl}/Client`, {
        params: params
      }
    );
  }

  getClientsCount(filter?: Record<string, any>): Observable<number> {
    let params = new HttpParams();
  
    if (filter) {
      params = params.set('filter', JSON.stringify(filter));
    }

    return this.http.get<number>(`${environment.apiBaseUrl}/Client/Count`, {
        params: params
      }
    );
  }
  
  getClientByID(id: number): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${environment.apiBaseUrl}/Client/${id}`);
  }

  updateClient(id: number, client : ClientRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/Client/${id}`, client);
  }

  deleteClientByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/Client/${id}`);
  }
}