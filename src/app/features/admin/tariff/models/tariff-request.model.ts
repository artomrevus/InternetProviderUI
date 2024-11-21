export interface TariffRequest {
    internetTariffStatusId: number;
    locationTypeId: number;
    name: string;
    price?: number;
    internetSpeedMbits?: number;
    description: string;
}
