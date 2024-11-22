import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectionRequestStatusRequest } from '../models/connection-request-status-request.model';
import { ConnectionRequestStatusResponse } from '../models/connection-request-status-response.model';
import { ConnectionRequestStatusService } from '../services/connection-request-status.service';

@Component({
  selector: 'app-edit-connection-request-status',
  templateUrl: './edit-connection-request-status.component.html',
  styleUrls: ['./edit-connection-request-status.component.css']
})
export class EditConnectionRequestStatusComponent implements OnInit, OnDestroy {

  id: number | null = null;
  connectionRequestStatusResponse?: ConnectionRequestStatusResponse 
  connectionRequestStatusRequest: ConnectionRequestStatusRequest 
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (private route: ActivatedRoute, private connectionRequestStatusService: ConnectionRequestStatusService, private router: Router) {
    this.connectionRequestStatusRequest = {
      name: ""
    };
  }

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.connectionRequestStatusService.getConnectionRequestStatusByID(this.id).subscribe({
            next: (response) => {
              this.connectionRequestStatusResponse = response;
              this.connectionRequestStatusRequest.name = response.name;
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
    if (!this.connectionRequestStatusRequest?.name || this.connectionRequestStatusRequest?.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.connectionRequestStatusService.updateConnectionRequestStatus(this.id, this.connectionRequestStatusRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/connection-request-statuses');
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