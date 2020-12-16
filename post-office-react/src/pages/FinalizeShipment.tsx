import React, { useState, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Button } from "@material-ui/core";
import BagsList from "../components/BagsList";
import ShipmentFinalized from "../components/ShipmentFinalized";
import ShipmentAPI from "../api/ShipmentAPI";
import IShipment from "../interfaces/IShipment";
import { Airport } from "../interfaces/Airport";

interface Props extends RouteComponentProps<{ id: string }> {}

const FinalizeShipment: React.FC<Props> = ({ match, history, location }) => {
    const [shipmentId, setShipmentId] = useState("");
    const initialShipment: IShipment = {
        id: "",
        shipmentNumber: "",
        airport: Airport.TLL,
        flightNumber: "",
        flightDate: new Date(),
        isFinalized: false,
        bags: [],
    };
    const [shipment, setShipment] = useState(initialShipment);

    useEffect(() => {
        ShipmentAPI.getShipmentById(match.params.id).then((shipment) => {
            setShipment(shipment);
        });
    }, []);

    const handleClick = () => {
        ShipmentAPI.finalizeShipment(match.params.id).then((id) => {
            setShipmentId(id);
        });
    };

    if (!!shipmentId) {
        return <Redirect to={`/shipments/${shipmentId}`} />;
    }

    if (shipment.isFinalized) {
        return (
            <ShipmentFinalized
                shipmentId={shipment.id!}
                shipmentNumber={shipment.shipmentNumber}
            />
        );
    }

    return (
        <div>
            <BagsList match={match} history={history} location={location} />
            <div
                style={{
                    margin: "2em auto",
                    textAlign: "center",
                    display: "table",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    href={`/content/${match.params.id}`}
                    style={{ marginRight: "3.5em" }}
                >
                    Back to edit content
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    href={`/add/${match.params.id}`}
                    style={{ marginLeft: "3.5em", marginRight: "3.5em" }}
                >
                    Back to edit bags
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    style={{ marginLeft: "3.5em" }}
                >
                    Finalize shipment
                </Button>
            </div>
        </div>
    );
};

export default FinalizeShipment;
