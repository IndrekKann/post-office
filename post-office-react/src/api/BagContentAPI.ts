import axios from "axios";
import ICreateContentForBags from "../interfaces/ICreateContentForBags";

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
}
