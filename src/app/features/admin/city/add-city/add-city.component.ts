import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CityService } from '../services/city.service';
import { CityRequest } from '../models/city-request.model';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnDestroy {

  city: CityRequest;
  private addCitySubscribtion?: Subscription 

  constructor (private cityService: CityService, private router: Router) {
    this.city = {
      name: ""
    };
  }

  onFormSubmit(): void {
    if (!this.city.name || this.city.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    this.addCitySubscribtion = this.cityService.addCity(this.city).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/cities');
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.addCitySubscribtion?.unsubscribe();
  }
}