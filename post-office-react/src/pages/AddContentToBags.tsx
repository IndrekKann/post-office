import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import ContentForm from "../components/ContentForm";
import LoadingSpinner from "../components/LoadingSpinner";
import BagAPI from "../api/BagAPI";
import ShipmentAPI from "../api/ShipmentAPI";
import IShipment from "../interfaces/IShipment";
import IBag from "../interfaces/IBag";
import IParcel from "../interfaces/IParcel";
import BagContentAPI from "../api/BagContentAPI";

interface Props extends RouteComponentProps<{ id: string }> {}

const AddContentToBags: React.FC<Props> = ({ match }) => {
    const [shipment, setShipment] = useState({} as IShipment);
    const [bags, setBags] = useState([] as IBag[]);
    const [parcels, setParcels] = useState([] as IParcel[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        BagAPI.getAllForShipment(match.params.id).then((bags) => {
            setBags(bags);
        });
        ShipmentAPI.getShipmentById(match.params.id).then((shipment) => {
            setShipment(shipment);
        });
        BagContentAPI.getAllForShipment(match.params.id).then((parcels) => {
            setParcels(parcels);
        });
        setLoading(false);
    }, [match.params.id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <ContentForm
            shipmentId={match.params.id}
            shipmentNumber={shipment.shipmentNumber}
            isFinalized={shipment.isFinalized}
            bags={bags}
            parcels={parcels}
        />
    );
};

export default AddContentToBags;
