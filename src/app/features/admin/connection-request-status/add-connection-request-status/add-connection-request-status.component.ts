import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ConnectionRequestStatusService } from '../services/connection-request-status.service';
import { ConnectionRequestStatusRequest } from '../models/connection-request-status-request.model';

@Component({
  selector: 'app-add-connection-request-status',
  templateUrl: './add-connection-request-status.component.html',
  styleUrls: ['./add-connection-request-status.component.css']
})
export class AddConnectionRequestStatusComponent implements OnDestroy {

  connectionRequestStatusRequest: ConnectionRequestStatusRequest;
  private addSubscribtion?: Subscription 

  constructor (private connectionRequestStatusService: ConnectionRequestStatusService, private router: Router) {
    this.connectionRequestStatusRequest = {
      name: ""
    };
  }

  onFormSubmit(): void {
    if (!this.connectionRequestStatusRequest.name || this.connectionRequestStatusRequest.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    this.addSubscribtion = this.connectionRequestStatusService.addConnectionRequestStatus(this.connectionRequestStatusRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/connection-request-statuses');
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