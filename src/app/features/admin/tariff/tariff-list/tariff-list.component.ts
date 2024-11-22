import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TariffService } from '../services/tariff.service';
import { TariffResponse } from '../models/tariff-response.model';

@Component({
  selector: 'app-tariff-list',
  templateUrl: './tariff-list.component.html',
  styleUrls: ['./tariff-list.component.css']
})
export class TariffListComponent implements OnInit, OnDestroy {

  tariffs$?: Observable<TariffResponse[]>;
  private deleteSubscribtion?: Subscription 

  constructor (private tariffService: TariffService) {
  }

  ngOnInit(): void {
    this.tariffs$ = this.tariffService.getAllTariffs();
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.tariffService.deleteTariffByID(id).subscribe({
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
