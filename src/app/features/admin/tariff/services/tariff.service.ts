import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { TariffRequest } from '../models/tariff-request.model';
import { TariffResponse } from '../models/tariff-response.model';

@Injectable({
  providedIn: 'root'
})
export class TariffService {

  constructor(private http: HttpClient) { }

  getAllTariffs(): Observable<TariffResponse[]> {
    return this.http.get<TariffResponse[]>(`${environment.apiBaseUrl}/InternetTariff`);
  }

  getTarifftByID(id: number): Observable<TariffResponse> {
    return this.http.get<TariffResponse>(`${environment.apiBaseUrl}/InternetTariff/${id}`);
  }

  addTariff(tariff : TariffRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/InternetTariff`, tariff);
  }

  updateTariff(id: number, tariff : TariffRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/InternetTariff/${id}`, tariff);
  }

  deleteTariffByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/InternetTariff/${id}`);
  }
}