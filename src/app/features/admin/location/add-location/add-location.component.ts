import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocationTypeResponse } from '../../location-type/models/location-type-response.model';
import { LocationService } from '../services/location.service';
import { LocationRequest } from '../models/location-request.model';
import { LocationTypeService } from '../../location-type/services/location-type.service';
import { HouseService } from '../../house/services/house.service';
import { HouseResponse } from '../../house/models/house-response.model';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit, OnDestroy {

  locationRequest: LocationRequest;
  locationTypes$?: Observable<LocationTypeResponse[]>;
  houses$?: Observable<HouseResponse[]>;

  private addSubscribtion?: Subscription 

  constructor (
    private locationService: LocationService, 
    private locationTypeService: LocationTypeService, 
    private houseService: HouseService,
    private router: Router

    ) {
    this.locationRequest = {
      locationTypeId: -1,
      houseId: -1,
      apartmentNumber: undefined
    };
  }

  ngOnInit(): void {
    this.locationTypes$ = this.locationTypeService.getAllLocationTypes();
    this.houses$ = this.houseService.getAllHouses();
  }

  onFormSubmit(): void {
    if (this.locationRequest.locationTypeId === -1) {
      alert('Location type is not specified.');
      return;
    }

    if (this.locationRequest.houseId === -1) {
      alert('House is not specified.');
      return;
    }

    if (!Number.isInteger(Number(this.locationRequest.apartmentNumber))) {
      alert('Apartment number is incorrectly specified.');
      return;
    }

    this.addSubscribtion = this.locationService.addLocation(this.locationRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/locations');
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.addSubscribtion?.unsubscribe();
  }
}
