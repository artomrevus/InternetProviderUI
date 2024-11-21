import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CityService } from '../services/city.service';
import { CityResponse } from '../models/city-response.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit, OnDestroy {

  cities$?: Observable<CityResponse[]>;
  private deleteCitySubscribtion?: Subscription 

  constructor (private cityService: CityService) {
  }

  ngOnInit(): void {
    this.cities$ = this.cityService.getAllCities();
  }

  onDelete(id: number): void {
    this.deleteCitySubscribtion = this.cityService.deleteCityByID(id).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.deleteCitySubscribtion?.unsubscribe();
  }
}
