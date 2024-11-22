export interface ClientResponse {
    id: number;
    clientStatusId: number;
    clientStatusName: string;
    locationId: number;
    locationTypeName: string;
    cityName: string;
    streetName: string;
    houseNumber: string;
    apartmentNumber?: number; 
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    registrationDate: Date
}