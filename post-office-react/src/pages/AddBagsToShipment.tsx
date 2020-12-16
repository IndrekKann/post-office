import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import BagForm from "../components/BagForm";
import LoadingSpinner from "../components/LoadingSpinner";
import BagAPI from "../api/BagAPI";
import ShipmentAPI from "../api/ShipmentAPI";
import IBagCreation from "../interfaces/IBagCreation";
import IShipment from "../interfaces/IShipment";

interface Props extends RouteComponentProps<{ id: string }> {}

const AddBagsToShipment: React.FC<Props> = ({ match }) => {
    const emptyBags: IBagCreation[] = [];
    const [shipment, setShipment] = useState({} as IShipment);
    const [bags, setBags] = useState(emptyBags);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        BagAPI.getAllForShipmentCreate(match.params.id).then((bags) => {
            setBags(bags);
        });
        ShipmentAPI.getShipmentById(match.params.id).then((shipment) => {
            setShipment(shipment);
        });
        setLoading(false);
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <BagForm
            shipmentId={match.params.id}
            shipmentNumber={shipment.shipmentNumber}
            isFinalized={shipment.isFinalized}
            bags={bags}
        />
    );
};

export default AddBagsToShipment;
