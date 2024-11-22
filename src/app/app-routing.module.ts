import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientStatusListComponent } from './features/admin/client-status/client-status-list/client-status-list.component';
import { AddClientStatusComponent } from './features/admin/client-status/add-client-status/add-client-status.component';
import { EditClientStatusComponent } from './features/admin/client-status/edit-client-status/edit-client-status.component';
import { AdminLoginComponent } from './features/admin/auth/admin-login/admin-login.component';
import { StartPageComponent } from './features/start-page/start-page.component';
import { adminAuthGuard } from './features/admin/auth/guards/admin-auth.guard';
import { LocationTypeListComponent } from './features/admin/location-type/location-type-list/location-type-list.component';
import { AddLocationTypeComponent } from './features/admin/location-type/add-location-type/add-location-type.component';
import { EditLocationTypeComponent } from './features/admin/location-type/edit-location-type/edit-location-type.component';
import { CityListComponent } from './features/admin/city/city-list/city-list.component';
import { AddCityComponent } from './features/admin/city/add-city/add-city.component';
import { EditCityComponent } from './features/admin/city/edit-city/edit-city.component';
import { EditStreetComponent } from './features/admin/street/edit-street/edit-street.component';
import { AddStreetComponent } from './features/admin/street/add-street/add-street.component';
import { StreetListComponent } from './features/admin/street/street-list/street-list.component';
import { HouseListComponent } from './features/admin/house/house-list/house-list.component';
import { AddHouseComponent } from './features/admin/house/add-house/add-house.component';
import { EditHouseComponent } from './features/admin/house/edit-house/edit-house.component';
import { LocationListComponent } from './features/admin/location/location-list/location-list.component';
import { AddLocationComponent } from './features/admin/location/add-location/add-location.component';
import { EditLocationComponent } from './features/admin/location/edit-location/edit-location.component';
import { EditClientComponent } from './features/admin/client/edit-client/edit-client.component';
import { ClientListComponent } from './features/admin/client/client-list/client-list.component';
import { TariffStatusListComponent } from './features/admin/tariff-status/tariff-status-list/tariff-status-list.component';
import { AddTariffStatusComponent } from './features/admin/tariff-status/add-tariff-status/add-tariff-status.component';
import { EditTariffStatusComponent } from './features/admin/tariff-status/edit-tariff-status/edit-tariff-status.component';
import { ConnectionRequestStatusListComponent } from './features/admin/connection-request-status/connection-request-status-list/connection-request-status-list.component';
import { AddConnectionRequestStatusComponent } from './features/admin/connection-request-status/add-connection-request-status/add-connection-request-status.component';
import { EditConnectionRequestStatusComponent } from './features/admin/connection-request-status/edit-connection-request-status/edit-connection-request-status.component';
import { EditTariffComponent } from './features/admin/tariff/edit-tariff/edit-tariff.component';
import { AddTariffComponent } from './features/admin/tariff/add-tariff/add-tariff.component';
import { TariffListComponent } from './features/admin/tariff/tariff-list/tariff-list.component';
import { ConnectionRequestListComponent } from './features/admin/connection-request/connection-request-list/connection-request-list.component';
import { AddConnectionRequestComponent } from './features/admin/connection-request/add-connection-request/add-connection-request.component';
import { EditConnectionRequestComponent } from './features/admin/connection-request/edit-connection-request/edit-connection-request.component';
import { ClientLoginComponent } from './features/client/auth/client-login/client-login.component';
import { ClientAuthOptionsComponent } from './features/client/auth/client-auth-options/client-auth-options.component';
import { ClientRegisterComponent } from './features/client/auth/client-register/client-register.component';
import { clientAuthGuard } from './features/client/auth/guards/client-auth.guard';
import { ProfileComponent } from './features/client/profile/profile.component';
import { EditProfileComponent } from './features/client/edit-profile/edit-profile.component';
import { ExploreTariffsComponent } from './features/client/explore-tariffs/explore-tariffs.component';
import { ClientConnectionRequestsComponent } from './features/client/client-connection-requests/client-connection-requests.component';
import { NewConnectionRequestComponent } from './features/client/new-connection-request/new-connection-request.component';

const routes: Routes = [
  {
    path: "",
    component: StartPageComponent
  },
  {
    path: "admin/login",
    component: AdminLoginComponent
  },
  {
    path: "admin/client-statuses",
    component: ClientStatusListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/client-status/add",
    component: AddClientStatusComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/client-status/:id",
    component: EditClientStatusComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/location-types",
    component: LocationTypeListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/location-type/add",
    component: AddLocationTypeComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/location-type/:id",
    component: EditLocationTypeComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/cities",
    component: CityListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/city/add",
    component: AddCityComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/city/:id",
    component: EditCityComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/streets",
    component: StreetListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/street/add",
    component: AddStreetComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/street/:id",
    component: EditStreetComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/houses",
    component: HouseListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/house/add",
    component: AddHouseComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/house/:id",
    component: EditHouseComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/locations",
    component: LocationListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/location/add",
    component: AddLocationComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/location/:id",
    component: EditLocationComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/clients",
    component: ClientListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/client/:id",
    component: EditClientComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/tariff-statuses",
    component: TariffStatusListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/tariff-status/add",
    component: AddTariffStatusComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/tariff-status/:id",
    component: EditTariffStatusComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/connection-request-statuses",
    component: ConnectionRequestStatusListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/connection-request-status/add",
    component: AddConnectionRequestStatusComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/connection-request-status/:id",
    component: EditConnectionRequestStatusComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/tariffs",
    component: TariffListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/tariff/add",
    component: AddTariffComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/tariff/:id",
    component: EditTariffComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/connection-requests",
    component: ConnectionRequestListComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/connection-request/add",
    component: AddConnectionRequestComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "admin/connection-request/:id",
    component: EditConnectionRequestComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: "client/auth-options",
    component: ClientAuthOptionsComponent,
  },
  {
    path: "client/login",
    component: ClientLoginComponent,
  },
  {
    path: "client/register",
    component: ClientRegisterComponent,
  },
  {
    path: "client/profile",
    component: ProfileComponent,
    canActivate: [clientAuthGuard]
  },
  {
    path: "client/edit-profile",
    component: EditProfileComponent,
    canActivate: [clientAuthGuard]
  },
  {
    path: "client/explore-tariffs",
    component: ExploreTariffsComponent,
    canActivate: [clientAuthGuard]
  },
  {
    path: "client/connection-requests",
    component: ClientConnectionRequestsComponent,
    canActivate: [clientAuthGuard]
  },
  {
    path: "client/connection-request/:id",
    component: NewConnectionRequestComponent,
    canActivate: [clientAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
