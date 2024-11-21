import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ConnectionRequestStatusResponse } from '../models/connection-request-status-response.model';
import { ConnectionRequestStatusRequest } from '../models/connection-request-status-request.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionRequestStatusService {

  constructor(private http: HttpClient) { }

  getAllConnectionRequestStatuses(): Observable<ConnectionRequestStatusResponse[]> {
    return this.http.get<ConnectionRequestStatusResponse[]>(`${environment.apiBaseUrl}/InternetConnectionRequestStatus`);
  }

  getConnectionRequestStatusByID(id: number): Observable<ConnectionRequestStatusResponse> {
    return this.http.get<ConnectionRequestStatusResponse>(`${environment.apiBaseUrl}/InternetConnectionRequestStatus/${id}`);
  }

  addConnectionRequestStatus(connectionRequestStatus : ConnectionRequestStatusRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/InternetConnectionRequestStatus`, connectionRequestStatus);
  }

  updateConnectionRequestStatus(id: number, connectionRequestStatus : ConnectionRequestStatusRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/InternetConnectionRequestStatus/${id}`, connectionRequestStatus);
  }

  deleteConnectionRequestStatusByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/InternetConnectionRequestStatus/${id}`);
  }
}