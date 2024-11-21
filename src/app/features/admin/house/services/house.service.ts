import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { HouseResponse } from '../models/house-response.model';
import { HouseRequest } from '../models/house-request.model';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient) { }

  getAllHouses(): Observable<HouseResponse[]> {
    return this.http.get<HouseResponse[]>(`${environment.apiBaseUrl}/House`);
  }

  getHouseByID(id: number): Observable<HouseResponse> {
    return this.http.get<HouseResponse>(`${environment.apiBaseUrl}/House/${id}`);
  }

  addHouse(house : HouseRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/House`, house);
  }

  updateHouse(id: number, house : HouseRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/House/${id}`, house);
  }

  deleteHouseByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/House/${id}`);
  }
}