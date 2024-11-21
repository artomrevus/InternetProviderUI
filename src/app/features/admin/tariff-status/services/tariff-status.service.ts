import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { TariffStatusResponse } from '../models/tariff-status-response.model';
import { TariffStatusRequest } from '../models/tariff-status-request.model';

@Injectable({
  providedIn: 'root'
})
export class TariffStatusService {

  constructor(private http: HttpClient) { }

  getAllTariffStatuses(): Observable<TariffStatusResponse[]> {
    return this.http.get<TariffStatusResponse[]>(`${environment.apiBaseUrl}/InternetTariffStatus`);
  }

  getTariffStatusByID(id: number): Observable<TariffStatusResponse> {
    return this.http.get<TariffStatusResponse>(`${environment.apiBaseUrl}/InternetTariffStatus/${id}`);
  }

  addTariffStatus(tariffStatus : TariffStatusRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/InternetTariffStatus`, tariffStatus);
  }

  updateTariffStatus(id: number, tariffStatus : TariffStatusRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/InternetTariffStatus/${id}`, tariffStatus);
  }

  deleteTariffStatusByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/InternetTariffStatus/${id}`);
  }
}
