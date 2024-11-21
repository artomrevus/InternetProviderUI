import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SortType } from '../models/sort-type.model';
import { ConnectionRequestResponse } from '../models/connection-request-response.model';
import { ConnectionRequestRequest } from '../models/connection-request-request.model';


@Injectable({
  providedIn: 'root'
})
export class ConnectionRequestService {

  constructor(private http: HttpClient) { }

  getAllConnectionRequests(): Observable<ConnectionRequestResponse[]> {
    return this.http.get<ConnectionRequestResponse[]>(`${environment.apiBaseUrl}/InternetConnectionRequest`);
  }

  getConnectionRequests(
    filter?: Record<string, any>,
    sort?: Record<string, SortType>,
    pageNumber?: number,
    pageSize?: number
  ): Observable<ConnectionRequestResponse[]> {

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
  
    return this.http.get<ConnectionRequestResponse[]>(`${environment.apiBaseUrl}/InternetConnectionRequest`, {
        params: params
      }
    );
  }

  getConnectionRequestsCount(filter?: Record<string, any>): Observable<number> {
    let params = new HttpParams();
  
    if (filter) {
      params = params.set('filter', JSON.stringify(filter));
    }

    return this.http.get<number>(`${environment.apiBaseUrl}/InternetConnectionRequest/Count`, {
        params: params
      }
    );
  }
  
  getConnectionRequestByID(id: number): Observable<ConnectionRequestResponse> {
    return this.http.get<ConnectionRequestResponse>(`${environment.apiBaseUrl}/InternetConnectionRequest/${id}`);
  }

  addConnectionRequest(connectionRequest : ConnectionRequestRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/InternetConnectionRequest`, connectionRequest);
  }

  updateConnectionRequest(id: number, connectionRequest : ConnectionRequestRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/InternetConnectionRequest/${id}`, connectionRequest);
  }

  deleteConnectionRequestByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/InternetConnectionRequest/${id}`);
  }
}