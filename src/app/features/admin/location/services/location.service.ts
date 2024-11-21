import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationResponse } from '../models/location-response.model';
import { LocationRequest } from '../models/location-request.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SortType } from '../models/sort-type.model';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getAllLocations(): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(`${environment.apiBaseUrl}/Location`);
  }

  getLocations(
    filter?: Record<string, any>,
    sort?: Record<string, SortType>,
    pageNumber?: number,
    pageSize?: number
  ): Observable<LocationResponse[]> {

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
  
    return this.http.get<LocationResponse[]>(`${environment.apiBaseUrl}/Location`, {
        params: params
      }
    );
  }

  getLocationsCount(filter?: Record<string, any>): Observable<number> {
    let params = new HttpParams();
  
    if (filter) {
      params = params.set('filter', JSON.stringify(filter));
    }

    return this.http.get<number>(`${environment.apiBaseUrl}/Location/Count`, {
        params: params
      }
    );
  }
  
  getLocationByID(id: number): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${environment.apiBaseUrl}/Location/${id}`);
  }

  addLocation(location : LocationRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/Location`, location);
  }

  updateLocation(id: number, location : LocationRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/Location/${id}`, location);
  }

  deleteLocationByID(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/Location/${id}`);
  }
}