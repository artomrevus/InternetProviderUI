import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LocationTypeService } from '../services/location-type.service';
import { LocationTypeResponse } from '../models/location-type-response.model';

@Component({
  selector: 'app-location-type-list',
  templateUrl: './location-type-list.component.html',
  styleUrls: ['./location-type-list.component.css']
})
export class LocationTypeListComponent implements OnInit, OnDestroy {

  locationTypes$?: Observable<LocationTypeResponse[]>;
  private deleteSubscribtion?: Subscription 

  constructor (private locationTypeService: LocationTypeService) {
  }

  ngOnInit(): void {
    this.locationTypes$ = this.locationTypeService.getAllLocationTypes();
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.locationTypeService.deleteLocationTypeByID(id).subscribe({
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
