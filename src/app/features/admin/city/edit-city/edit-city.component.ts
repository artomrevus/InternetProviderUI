import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CityService } from '../services/city.service';
import { CityResponse } from '../models/city-response.model';
import { CityRequest } from '../models/city-request.model';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit, OnDestroy {

  id: number | null = null;
  cityResponse?: CityResponse 
  cityRequest: CityRequest 
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (private route: ActivatedRoute, private cityService: CityService, private router: Router) {
    this.cityRequest = {
      name: "",
    };
  }

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.cityService.getCityByID(this.id).subscribe({
            next: (response) => {
              this.cityResponse = response;
              this.cityRequest.name = response.name;
            },
            error: (error) => {
              alert(error.error);
            }
          });
        }
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  onFormSubmit(): void {
    if (!this.cityRequest?.name || this.cityRequest?.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.cityService.updateCity(this.id, this.cityRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/cities');
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