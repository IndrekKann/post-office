import IParcel from "./IParcel";
import { Type } from "./Type";

export default interface IBag {
    id?: string;
    bagNumber: string;
    type: Type;
    letterCount: number;
    weight: number;
    price: number;
    parcels: IParcel[];
}
