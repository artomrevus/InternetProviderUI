import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { LocationTypeResponse } from '../models/location-type-response.model';
import { LocationTypeRequest } from '../models/location-type-request.model';

@Injectable({
  providedIn: 'root'
})
export class LocationTypeService {

  constructor(private http: HttpClient) { }

  getAllLocationTypes(): Observable<LocationTypeResponse[]> {
    return this.http.get<LocationTypeResponse[]>(`${environment.apiBaseUrl}/LocationType`);
  }

  getLocationTypeByID(id: number): Observable<LocationTypeResponse> {
    return this.http.get<LocationTypeResponse>(`${environment.apiBaseUrl}/LocationType/${id}`);
  }

  addLocationType(locationType : LocationTypeRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/LocationType`, locationType);
  }

  updateLocationType(id: number, locationType : LocationTypeRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/LocationType/${id}`, locationType);
  }

  deleteLocationTypeByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/LocationType/${id}`);
  }
}
