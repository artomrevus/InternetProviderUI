import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StreetResponse } from '../models/street-response.model';
import { CityService } from '../../city/services/city.service';
import { StreetService } from '../services/street.service';
import { StreetRequest } from '../models/street-request.model';
import { CityResponse } from '../../city/models/city-response.model';

@Component({
  selector: 'app-edit-street',
  templateUrl: './edit-street.component.html',
  styleUrls: ['./edit-street.component.css']
})
export class EditStreetComponent implements OnInit, OnDestroy {

  id: number | null = null;
  streetResponse?: StreetResponse 
  streetRequest: StreetRequest 
  cities$?: Observable<CityResponse[]>;
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (private route: ActivatedRoute, private streetService: StreetService, private cityService: CityService, private router: Router) {
    this.streetRequest = {
      cityId: -1,
      name: ""
    };
  }

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.streetService.getStreetByID(this.id).subscribe({
            next: (response) => {
              this.streetResponse = response;
              this.streetRequest.name = response.streetName;
            },
            error: (error) => {
              alert(error.error);
            }
          });

          this.cities$ = this.cityService.getAllCities();
        }
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  onFormSubmit(): void {
    if (this.streetRequest.cityId === -1) {
      alert('City is not specified.');
      return;
    }

    if (!this.streetRequest?.name || this.streetRequest?.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.streetService.updateStreet(this.id, this.streetRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/streets');
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