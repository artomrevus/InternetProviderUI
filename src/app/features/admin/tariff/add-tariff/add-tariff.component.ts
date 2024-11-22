import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CityService } from '../../city/services/city.service';
import { CityResponse } from '../../city/models/city-response.model';
import { TariffRequest } from '../models/tariff-request.model';
import { TariffStatusResponse } from '../../tariff-status/models/tariff-status-response.model';
import { LocationTypeResponse } from '../../location-type/models/location-type-response.model';
import { TariffService } from '../services/tariff.service';
import { TariffStatusService } from '../../tariff-status/services/tariff-status.service';
import { LocationTypeService } from '../../location-type/services/location-type.service';

@Component({
  selector: 'app-add-tariff',
  templateUrl: './add-tariff.component.html',
  styleUrls: ['./add-tariff.component.css']
})
export class AddTariffComponent implements OnInit, OnDestroy {

  tariffRequest: TariffRequest;
  tariffStatuses$?: Observable<TariffStatusResponse[]>;
  locationTypes$?: Observable<LocationTypeResponse[]>;
  private addSubscribtion?: Subscription 

  constructor (
    private tariffService: TariffService,
    private tariffStatusService: TariffStatusService,
    private locationTypeService: LocationTypeService,
    private router: Router
  ) {
    this.tariffRequest = {
      internetTariffStatusId: -1,
      locationTypeId: -1,
      name: "",
      price: undefined,
      internetSpeedMbits: undefined,
      description: "",
    };
  }

  ngOnInit(): void {
    this.tariffStatuses$ = this.tariffStatusService.getAllTariffStatuses();
    this.locationTypes$ = this.locationTypeService.getAllLocationTypes();
  }

  onFormSubmit(): void {
    if (this.tariffRequest.internetTariffStatusId === -1) {
      alert('Tariff status is not specified.');
      return;
    }

    if (this.tariffRequest.locationTypeId === -1) {
      alert('Location type is not specified.');
      return;
    }
    
    if (this.tariffRequest.price && this.tariffRequest.price < 0) {
      alert('Tariff price cant be less than 0.');
      return;
    }

    if (this.tariffRequest.internetSpeedMbits && this.tariffRequest.internetSpeedMbits < 0) {
      alert('Internet speed cant be less than 0.');
      return;
    }

    if (!this.tariffRequest.name || this.tariffRequest.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    if (!this.tariffRequest.description || this.tariffRequest.description.trim() === '') {
      alert('Description is not specified.');
      return;
    }

    this.addSubscribtion = this.tariffService.addTariff(this.tariffRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/tariffs');
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
