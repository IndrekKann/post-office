import axios from "axios";
import ICreateContentForBags from "../interfaces/ICreateContentForBags";
import IParcel from "../interfaces/IParcel";

export default abstract class BagContentAPI {
    private static axios = axios.create({
        baseURL: "http://localhost:5000/api/bagcontents",
        headers: {
            common: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        },
    });

    static async createContentForBags(
        conent: ICreateContentForBags
    ): Promise<string> {
        const url = "";
        try {
            const response = await this.axios.post<string>(url, conent);
            if (response.status === 201) {
                return response.data;
            }
            return "";
        } catch (error) {
            return "";
        }
    }

    static async getAllForShipment(id: string): Promise<IParcel[]> {
        const url = `/${id}`;
        try {
            const response = await this.axios.get<IParcel[]>(url);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            return [];
        }
    }

    static async getAllParcelNumbers(): Promise<string[]> {
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
}
