import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import ContentForm from "../components/ContentForm";
import LoadingSpinner from "../components/LoadingSpinner";
import BagAPI from "../api/BagAPI";
import ShipmentAPI from "../api/ShipmentAPI";
import IBag from "../interfaces/IBag";
import IShipment from "../interfaces/IShipment";

interface Props extends RouteComponentProps<{ id: string }> {}

const AddContentToBags: React.FC<Props> = ({ match }) => {
    const emptyBags: IBag[] = [];
    const [shipment, setShipment] = useState({} as IShipment);
    const [bags, setBags] = useState(emptyBags);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        BagAPI.getAllForShipment(match.params.id).then((bags) => {
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
        <ContentForm
            shipmentId={match.params.id}
            shipmentNumber={shipment.shipmentNumber}
            isFinalized={shipment.isFinalized}
            bags={bags}
        />
    );
};

export default AddContentToBags;
