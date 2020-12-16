import IBag from "./IBag";

export default interface ICreateContentForBags {
    shipmentId: string;
    bags: IBag[];
}
