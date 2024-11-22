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

  citiesResponse$?: Observable<CityResponse[]>;
  private deleteSubscribtion?: Subscription 

  constructor (private cityService: CityService) {
  }

  ngOnInit(): void {
    this.citiesResponse$ = this.cityService.getAllCities();
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.cityService.deleteCityByID(id).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.deleteSubscribtion?.unsubscribe();
  }
}
