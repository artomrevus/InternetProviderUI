import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { CityResponse } from '../models/city-response.model';
import { CityRequest } from '../models/city-request.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<CityResponse[]> {
    return this.http.get<CityResponse[]>(`${environment.apiBaseUrl}/City`);
  }

  getCityByID(id: number): Observable<CityResponse> {
    return this.http.get<CityResponse>(`${environment.apiBaseUrl}/City/${id}`);
  }

  addCity(city : CityRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/City`, city);
  }

  updateCity(id: number, city : CityRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/City/${id}`, city);
  }

  deleteCityByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/City/${id}`);
  }
}
