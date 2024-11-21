import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { StreetResponse } from '../models/street-response.model';
import { StreetRequest } from '../models/street-request.model';

@Injectable({
  providedIn: 'root'
})
export class StreetService {

  constructor(private http: HttpClient) { }

  getAllStreets(): Observable<StreetResponse[]> {
    return this.http.get<StreetResponse[]>(`${environment.apiBaseUrl}/Street`);
  }

  getStreetByID(id: number): Observable<StreetResponse> {
    return this.http.get<StreetResponse>(`${environment.apiBaseUrl}/Street/${id}`);
  }

  addStreet(street : StreetRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/Street`, street);
  }

  updateStreet(id: number, street : StreetRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/Street/${id}`, street);
  }

  deleteStreetByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/Street/${id}`);
  }
}