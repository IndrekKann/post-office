import IBagCreation from "./IBagCreation";

export default interface ICreateBagsForShipment {
    shipmentId: string;
    bags: IBagCreation[];
}
