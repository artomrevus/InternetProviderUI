import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationTypeService } from '../services/location-type.service';
import { LocationTypeResponse } from '../models/location-type-response.model';

@Component({
  selector: 'app-edit-location-type',
  templateUrl: './edit-location-type.component.html',
  styleUrls: ['./edit-location-type.component.css']
})
export class EditLocationTypeComponent implements OnInit, OnDestroy {

  id: number | null = null;
  locationType?: LocationTypeResponse 
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (private route: ActivatedRoute, private locationTypeService: LocationTypeService, private router: Router) {
  }

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.locationTypeService.getLocationTypeByID(this.id).subscribe({
            next: (response) => {
              this.locationType = response;
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
    if (!this.locationType?.name || this.locationType?.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.locationTypeService.updateLocationType(this.id, {name: this.locationType.name}).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/location-types');
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
