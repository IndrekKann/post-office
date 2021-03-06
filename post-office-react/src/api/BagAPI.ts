import axios from "axios";
import IBag from "../interfaces/IBag";
import IBagCreation from "../interfaces/IBagCreation";
import ICreateBagsForShipment from "../interfaces/ICreateBagsForShipment";

export default abstract class BagAPI {
    private static axios = axios.create({
        baseURL: "http://localhost:5000/api/bags",
        headers: {
            common: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        },
    });

    static async getAllForShipment(id: string): Promise<IBag[]> {
        const url = `/${id}`;
        try {
            const response = await this.axios.get<IBag[]>(url);
            if (response.status === 200) {
                const bags: IBag[] = [];
                response.data.forEach((bag) => {
                    let newBag: IBag = {
                        id: bag.id,
                        bagNumber: bag.bagNumber,
                        type: bag.type,
                        letterCount: bag.letterCount,
                        weight: bag.weight,
                        price: bag.price,
                        parcels: [],
                    };
                    bags.push(newBag);
                });
                return bags;
            }
            return [];
        } catch (error) {
            return [];
        }
    }

    static async getAllForShipmentCreate(id: string): Promise<IBagCreation[]> {
        const url = `/${id}`;
        try {
            const response = await this.axios.get<IBag[]>(url);
            if (response.status === 200) {
                const bags: IBagCreation[] = [];
                response.data.forEach((bag) => {
                    let newBag: IBagCreation = {
                        id: bag.id!,
                        bagNumber: bag.bagNumber,
                        type: bag.type,
                    };
                    bags.push(newBag);
                });
                return bags;
            }
            return [];
        } catch (error) {
            return [];
        }
    }

    static async getAllBagNumbers(): Promise<string[]> {
        const url = "";
        try {
            const response = await this.axios.get<string[]>(url);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            return [];
        }
    }

    static async getBagById(id: string): Promise<IBag> {
        const url = `/bag/${id}`;
        try {
            const response = await this.axios.get<IBag>(url);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            return error.data;
        }
    }

    static async createBagsForShipment(
        bags: ICreateBagsForShipment
    ): Promise<string> {
        const url = "";
        try {
            const response = await this.axios.post<string>(url, bags);
            if (response.status === 201) {
                return response.data;
            }
            return "";
        } catch (error) {
            return "";
        }
    }
}
