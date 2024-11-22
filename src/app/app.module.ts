import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { ClientStatusListComponent } from './features/admin/client-status/client-status-list/client-status-list.component';
import { AddClientStatusComponent } from './features/admin/client-status/add-client-status/add-client-status.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditClientStatusComponent } from './features/admin/client-status/edit-client-status/edit-client-status.component';
import { AdminLoginComponent } from './features/admin/auth/admin-login/admin-login.component';
import { AuthInterceptor } from './features/interceptors/auth.interceptor';
import { StartPageComponent } from './features/start-page/start-page.component';
import { LocationTypeListComponent } from './features/admin/location-type/location-type-list/location-type-list.component';
import { AddLocationTypeComponent } from './features/admin/location-type/add-location-type/add-location-type.component';
import { EditLocationTypeComponent } from './features/admin/location-type/edit-location-type/edit-location-type.component';
import { CityListComponent } from './features/admin/city/city-list/city-list.component';
import { AddCityComponent } from './features/admin/city/add-city/add-city.component';
import { EditCityComponent } from './features/admin/city/edit-city/edit-city.component';
import { StreetListComponent } from './features/admin/street/street-list/street-list.component';
import { AddStreetComponent } from './features/admin/street/add-street/add-street.component';
import { EditStreetComponent } from './features/admin/street/edit-street/edit-street.component';
import { HouseListComponent } from './features/admin/house/house-list/house-list.component';
import { AddHouseComponent } from './features/admin/house/add-house/add-house.component';
import { EditHouseComponent } from './features/admin/house/edit-house/edit-house.component';
import { LocationListComponent } from './features/admin/location/location-list/location-list.component';
import { AddLocationComponent } from './features/admin/location/add-location/add-location.component';
import { EditLocationComponent } from './features/admin/location/edit-location/edit-location.component';
import { ClientListComponent } from './features/admin/client/client-list/client-list.component';
import { EditClientComponent } from './features/admin/client/edit-client/edit-client.component';
import { TariffStatusListComponent } from './features/admin/tariff-status/tariff-status-list/tariff-status-list.component';
import { AddTariffStatusComponent } from './features/admin/tariff-status/add-tariff-status/add-tariff-status.component';
import { EditTariffStatusComponent } from './features/admin/tariff-status/edit-tariff-status/edit-tariff-status.component';
import { ConnectionRequestStatusListComponent } from './features/admin/connection-request-status/connection-request-status-list/connection-request-status-list.component';
import { AddConnectionRequestStatusComponent } from './features/admin/connection-request-status/add-connection-request-status/add-connection-request-status.component';
import { EditConnectionRequestStatusComponent } from './features/admin/connection-request-status/edit-connection-request-status/edit-connection-request-status.component';
import { TariffListComponent } from './features/admin/tariff/tariff-list/tariff-list.component';
import { AddTariffComponent } from './features/admin/tariff/add-tariff/add-tariff.component';
import { EditTariffComponent } from './features/admin/tariff/edit-tariff/edit-tariff.component';
import { ConnectionRequestListComponent } from './features/admin/connection-request/connection-request-list/connection-request-list.component';
import { AddConnectionRequestComponent } from './features/admin/connection-request/add-connection-request/add-connection-request.component';
import { EditConnectionRequestComponent } from './features/admin/connection-request/edit-connection-request/edit-connection-request.component';
import { ClientAuthOptionsComponent } from './features/client/auth/client-auth-options/client-auth-options.component';
import { ClientLoginComponent } from './features/client/auth/client-login/client-login.component';
import { ClientRegisterComponent } from './features/client/auth/client-register/client-register.component';
import { ProfileComponent } from './features/client/profile/profile.component';
import { EditProfileComponent } from './features/client/edit-profile/edit-profile.component';
import { ExploreTariffsComponent } from './features/client/explore-tariffs/explore-tariffs.component';
import { ClientConnectionRequestsComponent } from './features/client/client-connection-requests/client-connection-requests.component';
import { NewConnectionRequestComponent } from './features/client/new-connection-request/new-connection-request.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientStatusListComponent,
    AddClientStatusComponent,
    EditClientStatusComponent,
    AdminLoginComponent,
    StartPageComponent,
    LocationTypeListComponent,
    AddLocationTypeComponent,
    EditLocationTypeComponent,
    CityListComponent,
    AddCityComponent,
    EditCityComponent,
    StreetListComponent,
    AddStreetComponent,
    EditStreetComponent,
    HouseListComponent,
    AddHouseComponent,
    EditHouseComponent,
    LocationListComponent,
    AddLocationComponent,
    EditLocationComponent,
    ClientListComponent,
    EditClientComponent,
    TariffStatusListComponent,
    AddTariffStatusComponent,
    EditTariffStatusComponent,
    ConnectionRequestStatusListComponent,
    AddConnectionRequestStatusComponent,
    EditConnectionRequestStatusComponent,
    TariffListComponent,
    AddTariffComponent,
    EditTariffComponent,
    ConnectionRequestListComponent,
    AddConnectionRequestComponent,
    EditConnectionRequestComponent,
    ClientAuthOptionsComponent,
    ClientLoginComponent,
    ClientRegisterComponent,
    ProfileComponent,
    EditProfileComponent,
    ExploreTariffsComponent,
    ClientConnectionRequestsComponent,
    NewConnectionRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
