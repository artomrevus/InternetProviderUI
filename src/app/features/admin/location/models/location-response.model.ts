export interface LocationResponse {
    id: number;
    locationTypeName: string;
    cityName: string;
    streetName: string;
    houseNumber: string;
    apartmentNumber?: number;
}