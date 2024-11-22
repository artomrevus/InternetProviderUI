import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TariffStatusResponse } from '../models/tariff-status-response.model';
import { TariffStatusService } from '../services/tariff-status.service';

@Component({
  selector: 'app-tariff-status-list',
  templateUrl: './tariff-status-list.component.html',
  styleUrls: ['./tariff-status-list.component.css']
})
export class TariffStatusListComponent implements OnInit, OnDestroy {

  tariffStatuses$?: Observable<TariffStatusResponse[]>;
  private deleteSubscribtion?: Subscription 

  constructor (private tariffStatusService: TariffStatusService) {
  }

  ngOnInit(): void {
    this.tariffStatuses$ = this.tariffStatusService.getAllTariffStatuses();
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.tariffStatusService.deleteTariffStatusByID(id).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.deleteSubscribtion?.unsubscribe();
  }
}
