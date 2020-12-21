import IBag from "./IBag";
import IParcel from "./IParcel";

export default interface ICreateContentForBags {
    shipmentId: string;
    bags: IBag[];
    parcels: IParcel[];
}
