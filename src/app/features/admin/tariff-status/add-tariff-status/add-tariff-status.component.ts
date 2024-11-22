import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TariffStatusRequest } from '../models/tariff-status-request.model';
import { TariffStatusService } from '../services/tariff-status.service';

@Component({
  selector: 'app-add-tariff-status',
  templateUrl: './add-tariff-status.component.html',
  styleUrls: ['./add-tariff-status.component.css']
})
export class AddTariffStatusComponent implements OnDestroy {

  tariffStatusRequest: TariffStatusRequest;
  private addSubscribtion?: Subscription 

  constructor (private tariffStatusService: TariffStatusService, private router: Router) {
    this.tariffStatusRequest = {
      name: ""
    };
  }

  onFormSubmit(): void {
    if (!this.tariffStatusRequest.name || this.tariffStatusRequest.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    this.addSubscribtion = this.tariffStatusService.addTariffStatus(this.tariffStatusRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/tariff-statuses');
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