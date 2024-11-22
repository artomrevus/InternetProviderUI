import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TariffStatusResponse } from '../models/tariff-status-response.model';
import { TariffStatusService } from '../services/tariff-status.service';
import { TariffStatusRequest } from '../models/tariff-status-request.model';

@Component({
  selector: 'app-edit-tariff-status',
  templateUrl: './edit-tariff-status.component.html',
  styleUrls: ['./edit-tariff-status.component.css']
})
export class EditTariffStatusComponent implements OnInit, OnDestroy {

  id: number | null = null;
  tariffStatusResponse?: TariffStatusResponse 
  tariffStatusRequest: TariffStatusRequest 
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (private route: ActivatedRoute, private tariffStatusService: TariffStatusService, private router: Router) {
    this.tariffStatusRequest = {
      name: ""
    };
  }

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.tariffStatusService.getTariffStatusByID(this.id).subscribe({
            next: (response) => {
              this.tariffStatusResponse = response;
              this.tariffStatusRequest.name = response.name;
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
    if (!this.tariffStatusRequest?.name || this.tariffStatusRequest?.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.tariffStatusService.updateTariffStatus(this.id, this.tariffStatusRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/tariff-statuses');
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
