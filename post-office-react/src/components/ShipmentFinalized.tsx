import React from "react";
import { Button } from "@material-ui/core";
import "./ShipmentFinalized.css";

type Props = {
    shipmentId: string;
    shipmentNumber: string;
};

const ShipmentFinalized: React.FC<Props> = (props) => {
    return (
        <div className="message">
            <h1>Shipment with number {props.shipmentNumber}</h1>
            <h1>is finalized and cannot be edited.</h1>
            <Button
                variant="contained"
                color="primary"
                href="/"
                style={{ margin: "2em" }}
            >
                Back to shipments
            </Button>
            <Button
                variant="contained"
                color="primary"
                href={`/shipments/${props.shipmentId}`}
                style={{ margin: "2em" }}
            >
                Check content
            </Button>
        </div>
    );
};

export default ShipmentFinalized;
