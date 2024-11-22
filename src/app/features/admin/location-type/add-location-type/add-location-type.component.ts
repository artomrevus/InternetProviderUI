import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocationTypeRequest } from '../models/location-type-request.model';
import { LocationTypeService } from '../services/location-type.service';

@Component({
  selector: 'app-add-location-type',
  templateUrl: './add-location-type.component.html',
  styleUrls: ['./add-location-type.component.css']
})
export class AddLocationTypeComponent implements OnDestroy {

  locationType: LocationTypeRequest;
  private addSubscribtion?: Subscription 

  constructor (private locationTypeService: LocationTypeService, private router: Router) {
    this.locationType = {
      name: ""
    };
  }

  onFormSubmit(): void {
    if (!this.locationType.name || this.locationType.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    this.addSubscribtion = this.locationTypeService.addLocationType(this.locationType).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/location-types');
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
