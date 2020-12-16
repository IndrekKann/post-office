import axios from "axios";
import IShipment from "../interfaces/IShipment";

export default abstract class ShipmentAPI {
    private static axios = axios.create({
        baseURL: "http://localhost:5000/api/shipments",
        headers: {
            common: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        },
    });

    static async getAll(): Promise<IShipment[]> {
        const url = "";
        try {
            const response = await this.axios.get<IShipment[]>(url);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            return [];
        }
    }

    static async getShipmentById(id: string): Promise<IShipment> {
        const url = `/${id}`;
        try {
            const response = await this.axios.get<IShipment>(url);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            return error.data;
        }
    }

    static async createShipment(shipment: IShipment): Promise<string> {
        const url = "";
        try {
            const response = await this.axios.post<IShipment>(url, shipment);
            if (response.status === 201) {
                return response.data.id!;
            }
            return "";
        } catch (error) {
            return "";
        }
    }

    static async finalizeShipment(shipmentId: string): Promise<string> {
        const url = `/${shipmentId}`;
        try {
            const response = await this.axios.put<string>(url);
            if (response.status === 200) {
                return response.data;
            }
            return "";
        } catch (error) {
            return "";
        }
    }
}
