import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StreetService } from '../services/street.service';
import { StreetResponse } from '../models/street-response.model';

@Component({
  selector: 'app-street-list',
  templateUrl: './street-list.component.html',
  styleUrls: ['./street-list.component.css']
})
export class StreetListComponent implements OnInit, OnDestroy {

  streets$?: Observable<StreetResponse[]>;
  private deleteSubscribtion?: Subscription 

  constructor (private streetService: StreetService) {
  }

  ngOnInit(): void {
    this.streets$ = this.streetService.getAllStreets();
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.streetService.deleteStreetByID(id).subscribe({
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
