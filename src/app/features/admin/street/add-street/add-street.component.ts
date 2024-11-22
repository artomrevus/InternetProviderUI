import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StreetRequest } from '../models/street-request.model';
import { StreetService } from '../services/street.service';
import { CityService } from '../../city/services/city.service';
import { CityResponse } from '../../city/models/city-response.model';

@Component({
  selector: 'app-add-street',
  templateUrl: './add-street.component.html',
  styleUrls: ['./add-street.component.css']
})
export class AddStreetComponent implements OnInit, OnDestroy {

  street: StreetRequest;
  cities$?: Observable<CityResponse[]>;
  private addSubscribtion?: Subscription 

  constructor (private streetService: StreetService, private cityService: CityService, private router: Router) {
    this.street = {
      cityId: -1,
      name: ""
    };
  }

  ngOnInit(): void {
    this.cities$ = this.cityService.getAllCities();
  }

  onFormSubmit(): void {
    if (this.street.cityId === -1) {
      alert('City is not specified.');
      return;
    }

    if (!this.street.name || this.street.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    this.addSubscribtion = this.streetService.addStreet(this.street).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/streets');
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
