import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ClientAuthService } from '../services/client-auth.service';
import { ClientRegisterRequest } from '../models/client-register-request.model';
import { Validators } from '@angular/forms';
import { LocationResponse } from 'src/app/features/admin/location/models/location-response.model';
import { LocationService } from 'src/app/features/admin/location/services/location.service';
import { CityResponse } from 'src/app/features/admin/city/models/city-response.model';
import { CityService } from 'src/app/features/admin/city/services/city.service';
import { StreetService } from 'src/app/features/admin/street/services/street.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit, OnDestroy {

  // Register data
  clientRegisterRequest: ClientRegisterRequest;

  // Location
  locations$?: Observable<LocationResponse[]>;
  cityId: number;
  cities$?: Observable<CityResponse[]>;

  // New location request
  cityInput: string;
  streetInput: string;
  houseNumberInput: string;
  apartmentNumberInput: number | null = null;
  communicationEmailInput: string;

  // Subscriptions
  private registerSubscribtion?: Subscription;
  private loginSubscribtion?: Subscription;
  private getCitySubscribtion?: Subscription;

  
  constructor(
    private clientAuthService: ClientAuthService,
    private locationService: LocationService,
    private cityService: CityService,
    private router: Router
    ) {
    this.clientRegisterRequest = {
      userName: "",
      password: "",
      clientStatusId: 1,
      locationId: -1,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    };

    this.cityId = -1;
    this.cityInput = "";
    this.streetInput = "";
    this.houseNumberInput = "";
    this.communicationEmailInput = "";
  }

  ngOnInit(): void {
    this.cities$ = this.cityService.getAllCities();
  }

  onCitySelectLocationChange() : void {
    this.getCitySubscribtion = this.cityService.getCityByID(this.cityId).subscribe({
      next: (response) => {
        const filter: Record<string, any> = {
          "cityName" : response.name,
        };
    
        this.locations$ = this.locationService.getLocations(filter);
        console.log("Success.", response);
      },
      error: (error) => {
        alert("Register error.")
        console.warn(error);
      },
    });
  }

  onFormSubmit(): void {

    if (!this.clientRegisterRequest.userName || this.clientRegisterRequest.userName.trim().length < 3) {
      alert('Username length must be at least 3 characters.');
      return;
    }

    if (!this.clientRegisterRequest.password || this.clientRegisterRequest.password.trim().length < 8) {
      alert('Password length must be at least 8 characters.');
      return;
    }

    if (!this.clientRegisterRequest.firstName || this.clientRegisterRequest.firstName.trim().length < 2) {
      alert('First name length must be at least 2 characters.');
      return;
    }

    if (!this.clientRegisterRequest.lastName || this.clientRegisterRequest.lastName.trim().length < 2) {
      alert('Last name length must be at least 2 characters.');
      return;
    }

    if (!this.clientRegisterRequest.phoneNumber || !/^\+380[3-9][0-9]{8}$/.test(this.clientRegisterRequest.phoneNumber)) {
      alert('Phone number must me like "+380XXXXXXXXX".');
      return;
    }

    if (!this.clientRegisterRequest.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.clientRegisterRequest.email.trim())) {
      alert('Email is in incorrect format.');
      return;
    }

    if(this.clientRegisterRequest.locationId === -1) {
      alert('Location is not selected.');
      return;
    }
  
    this.registerSubscribtion = this.clientAuthService.register(this.clientRegisterRequest).subscribe({
      next: (response) => {

        this.loginSubscribtion = this.clientAuthService.login({
          userName: this.clientRegisterRequest.userName,
          password: this.clientRegisterRequest.password,
        })
        .subscribe({
          next: (response) => {
            this.clientAuthService.saveClientLoginResponse(response);
            this.router.navigateByUrl('/client/profile');
            console.log("Success.", response);
          },
          error: (error) => {
            alert("Login error.")
            console.warn(error);
          },
        });

        console.log("Success.", response);
      },
      error: (error) => {
        alert("Register error.")
        console.warn(error);
      },
    });
  }

  onAddNewLocationFormSubmit() {
    if (!this.cityInput || this.cityInput.trim().length < 2) {
      alert('City length must be at least 2 characters.');
      return;
    }

    if (!this.streetInput || this.streetInput.trim().length < 2) {
      alert('Street length must be at least 2 characters.');
      return;
    }

    if (!this.houseNumberInput || this.houseNumberInput.trim() === "") {
      alert('House number must be specified.');
      return;
    }

    if (!this.communicationEmailInput || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.communicationEmailInput.trim())) {
      alert('Communication email is in incorrect format.');
      return;
    }
  
    alert(`Request to add location ${this.cityInput + ", " + this.streetInput + ", " + this.houseNumberInput + ", " + (this.apartmentNumberInput ?? "")} sent. Wait for a message to email ${this.communicationEmailInput}`);
  }

  ngOnDestroy(): void {
    this.registerSubscribtion?.unsubscribe();
    this.getCitySubscribtion?.unsubscribe();
    this.loginSubscribtion?.unsubscribe();
  }
}