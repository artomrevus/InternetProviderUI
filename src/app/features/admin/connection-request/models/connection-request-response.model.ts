export interface ConnectionRequestResponse {
    id: number;
    clientPhoneNumber: string;
    clientEmail: string;
    internetTariffName: string;
    internetTariffPrice: number;
    internetTariffSpeedMbits: number;
    internetConnectionRequestStatusName: string;
    number: string;
    requestDate: Date
}