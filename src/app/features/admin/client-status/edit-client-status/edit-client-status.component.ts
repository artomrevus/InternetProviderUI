import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientStatusService } from '../services/client-status.service';
import { ClientStatusResponse } from '../models/client-status-response.model';

@Component({
  selector: 'app-edit-client-status',
  templateUrl: './edit-client-status.component.html',
  styleUrls: ['./edit-client-status.component.css']
})

export class EditClientStatusComponent implements OnInit, OnDestroy {

  id: number | null = null;
  clientStatus?: ClientStatusResponse 
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (private route: ActivatedRoute, private clientStatusService: ClientStatusService, private router: Router) {
  }

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.clientStatusService.getClientStatusByID(this.id).subscribe({
            next: (response) => {
              this.clientStatus = response;
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
    if (!this.clientStatus?.name || this.clientStatus?.name.trim() === '') {
      alert('Name is not specified.');
      return;
    }

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.clientStatusService.updateClientStatus(this.id, {name: this.clientStatus.name}).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/client-statuses');
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
