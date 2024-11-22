import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StreetService } from '../../street/services/street.service';
import { StreetResponse } from '../../street/models/street-response.model';
import { LocationTypeResponse } from '../../location-type/models/location-type-response.model';
import { HouseResponse } from '../../house/models/house-response.model';
import { LocationRequest } from '../models/location-request.model';
import { LocationResponse } from '../models/location-response.model';
import { LocationService } from '../services/location.service';
import { LocationTypeService } from '../../location-type/services/location-type.service';
import { HouseService } from '../../house/services/house.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit, OnDestroy {

  // Location / route id 
  id: number | null = null;

  // Location edit 
  locationResponse?: LocationResponse 
  locationRequest: LocationRequest 
  locationTypes$?: Observable<LocationTypeResponse[]>;
  houses$?: Observable<HouseResponse[]>;

  // Subscriptions
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (
    private route: ActivatedRoute,
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
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.locationService.getLocationByID(this.id).subscribe({
            next: (response) => {
              this.locationResponse = response;
              this.locationRequest.apartmentNumber = response.apartmentNumber;
            },
            error: (error) => {
              alert(error.error);
            }
          });

          this.locationTypes$ = this.locationTypeService.getAllLocationTypes();
          this.houses$ = this.houseService.getAllHouses();
        }
      },
      error: (error) => {
        alert(error);
      }
    });
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

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.locationService.updateLocation(this.id, this.locationRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/locations');
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscribtion?.unsubscribe();
    this.updateSubscribtion?.unsubscribe();
  }
}