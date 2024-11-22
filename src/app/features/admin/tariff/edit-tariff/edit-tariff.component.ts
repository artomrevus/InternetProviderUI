import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TariffResponse } from '../models/tariff-response.model';
import { TariffRequest } from '../models/tariff-request.model';
import { TariffStatusResponse } from '../../tariff-status/models/tariff-status-response.model';
import { LocationTypeResponse } from '../../location-type/models/location-type-response.model';
import { TariffService } from '../services/tariff.service';
import { TariffStatusService } from '../../tariff-status/services/tariff-status.service';
import { LocationTypeService } from '../../location-type/services/location-type.service';

@Component({
  selector: 'app-edit-tariff',
  templateUrl: './edit-tariff.component.html',
  styleUrls: ['./edit-tariff.component.css']
})
export class EditTariffComponent implements OnInit, OnDestroy {

  id: number | null = null;
  tariffResponse?: TariffResponse 
  tariffRequest: TariffRequest 
  tariffStatuses$?: Observable<TariffStatusResponse[]>;
  locationTypes$?: Observable<LocationTypeResponse[]>;
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (
    private route: ActivatedRoute, 
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
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.tariffService.getTarifftByID(this.id).subscribe({
            next: (response) => {
              this.tariffResponse = response;
              this.tariffRequest.name = response.name;
              this.tariffRequest.price = response.price;
              this.tariffRequest.internetSpeedMbits = response.internetSpeedMbits;
              this.tariffRequest.description = response.description;
            },
            error: (error) => {
              alert(error.error);
            }
          });

          this.tariffStatuses$ = this.tariffStatusService.getAllTariffStatuses();
          this.locationTypes$ = this.locationTypeService.getAllLocationTypes();
        }
      },
      error: (error) => {
        alert(error);
      }
    });
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

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.tariffService.updateTariff(this.id, this.tariffRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/tariffs');
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