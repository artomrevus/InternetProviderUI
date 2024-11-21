import { Injectable } from '@angular/core';
import { ClientStatusRequest } from '../models/client-status-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClientStatusResponse } from '../models/client-status-response.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientStatusService {

  constructor(private http: HttpClient) { }

  getAllClientStatuses(): Observable<ClientStatusResponse[]> {
    return this.http.get<ClientStatusResponse[]>(`${environment.apiBaseUrl}/ClientStatus`);
  }

  getClientStatusByID(id: number): Observable<ClientStatusResponse> {
    return this.http.get<ClientStatusResponse>(`${environment.apiBaseUrl}/ClientStatus/${id}`);
  }

  addClientStatus(clientStatus : ClientStatusRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/ClientStatus`, clientStatus);
  }

  updateClientStatus(id: number, clientStatus : ClientStatusRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/ClientStatus/${id}`, clientStatus);
  }

  deleteClientStatusByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/ClientStatus/${id}`);
  }
}
