import IBag from "./IBag";
import { Airport } from "./Airport";

export default interface IShipment {
    id?: string;
    shipmentNumber: string;
    airport: Airport;
    flightNumber: string;
    flightDate: Date;
    bags: IBag[];
    isFinalized: boolean;
}
