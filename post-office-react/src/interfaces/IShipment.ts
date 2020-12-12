export default interface IShipment {
    id: string;
    shipmentNumber: string;
    airport: number;
    flightNumber: string;
    flightDate: Date;
    bags: [];
    isFinalized: boolean;
}
