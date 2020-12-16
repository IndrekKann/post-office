export default interface IParcel {
    id?: string;
    bagId: string;
    parcelNumber: string;
    recipientName: string;
    destinationCountry: string;
    weight: number;
    price: number;
}
