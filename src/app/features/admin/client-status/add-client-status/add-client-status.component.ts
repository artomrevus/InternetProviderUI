import { Component, OnDestroy } from '@angular/core';
import { ClientStatusRequest } from '../models/client-status-request.model';
import { ClientStatusService } from '../services/client-status.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client-status',
  templateUrl: './add-client-status.component.html',
  styleUrls: ['./add-client-status.component.css']
})
export class AddClientStatusComponent implements OnDestroy {

  clientStatus: ClientStatusRequest;
  private updateSubscribtion?: Subscription 

  constructor (private clientStatusService: ClientStatusService, private router: Router) {
    this.clientStatus = {
      name: ""
    };
  }

  onFormSubmit(): void {
    if (!this.clientStatus.name || this.clientStatus.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    this.updateSubscribtion = this.clientStatusService.addClientStatus(this.clientStatus).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/client-statuses');
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.updateSubscribtion?.unsubscribe();
  }
}
