import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CityService } from '../services/city.service';
import { CityResponse } from '../models/city-response.model';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit, OnDestroy {

  id: number | null = null;
  city?: CityResponse 
  private paramsSubscribtion?: Subscription 
  private updateCitySubscribtion?: Subscription 

  constructor (private route: ActivatedRoute, private cityService: CityService, private router: Router) {
  }

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.cityService.getCityByID(this.id).subscribe({
            next: (response) => {
              this.city = response;
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
    if (!this.city?.name || this.city?.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateCitySubscribtion = this.cityService.updateCity(this.id, {name: this.city.name}).subscribe({
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
    this.updateCitySubscribtion?.unsubscribe();
  }
}