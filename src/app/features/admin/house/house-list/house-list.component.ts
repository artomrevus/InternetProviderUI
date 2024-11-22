import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HouseResponse } from '../models/house-response.model';
import { HouseService } from '../services/house.service';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit, OnDestroy {

  houses$?: Observable<HouseResponse[]>;
  private deleteSubscribtion?: Subscription 

  constructor (private houseService: HouseService) {
  }

  ngOnInit(): void {
    this.houses$ = this.houseService.getAllHouses();
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.houseService.deleteHouseByID(id).subscribe({
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