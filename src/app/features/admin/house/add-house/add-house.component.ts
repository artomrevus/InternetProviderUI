import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HouseService } from '../services/house.service';
import { StreetService } from '../../street/services/street.service';
import { StreetResponse } from '../../street/models/street-response.model';
import { HouseRequest } from '../models/house-request.model';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit, OnDestroy {

  house: HouseRequest;
  streets$?: Observable<StreetResponse[]>;
  private addSubscribtion?: Subscription 

  constructor (private houseService: HouseService, private streetService: StreetService, private router: Router) {
    this.house = {
      streetId: -1,
      houseNumber: ""
    };
  }

  ngOnInit(): void {
    this.streets$ = this.streetService.getAllStreets();
  }

  onFormSubmit(): void {
    if (this.house.streetId === -1) {
      alert('Street is not specified.');
      return;
    }

    if (!this.house.houseNumber || this.house.houseNumber.trim() === '') {
      alert('House number is not specified.');
      return;
    }

    this.addSubscribtion = this.houseService.addHouse(this.house).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/houses');
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
