import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HouseResponse } from '../models/house-response.model';
import { HouseRequest } from '../models/house-request.model';
import { HouseService } from '../services/house.service';
import { StreetService } from '../../street/services/street.service';
import { StreetResponse } from '../../street/models/street-response.model';

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.css']
})
export class EditHouseComponent implements OnInit, OnDestroy {

  id: number | null = null;
  houseResponse?: HouseResponse 
  houseRequest: HouseRequest 
  streets$?: Observable<StreetResponse[]>;
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (private route: ActivatedRoute, private houseService: HouseService, private streetService: StreetService, private router: Router) {
    this.houseRequest = {
      streetId: -1,
      houseNumber: ""
    };
  }

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.houseService.getHouseByID(this.id).subscribe({
            next: (response) => {
              this.houseResponse = response;
              this.houseRequest.houseNumber = response.houseNumber;
            },
            error: (error) => {
              alert(error.error);
            }
          });

          this.streets$ = this.streetService.getAllStreets();
        }
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  onFormSubmit(): void {
    if (this.houseRequest.streetId === -1) {
      alert('Street is not specified.');
      return;
    }

    if (!this.houseRequest?.houseNumber || this.houseRequest?.houseNumber.trim() === '') {
      alert('House number is not specified.');
      return;
    }

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.houseService.updateHouse(this.id, this.houseRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/houses');
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