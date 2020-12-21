import React, { useState, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import BagsList from "../components/BagsList";
import LoadingSpinner from "../components/LoadingSpinner";
import ShipmentFinalized from "../components/ShipmentFinalized";
import ShipmentAPI from "../api/ShipmentAPI";
import BagAPI from "../api/BagAPI";
import IShipment from "../interfaces/IShipment";
import { Airport } from "../interfaces/Airport";
import { Type } from "../interfaces/Type";

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
    const [validBags, setValidBags] = useState(true);
    const [validParcels, setValidParcels] = useState(true);
    const [validDate, setValidDate] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ShipmentAPI.getShipmentById(match.params.id).then((shipment) => {
            setShipment(shipment);
            setValidDate(
                new Date(shipment.flightDate).getTime() < new Date().getTime()
            );
        });
        BagAPI.getAllForShipment(match.params.id).then((bags) => {
            if (bags.length === 0) {
                setValidBags(false);
            } else {
                bags.forEach((bag) => {
                    if (bag.type === Type.Parcel && bag.letterCount === 0) {
                        setValidParcels(false);
                    }
                });
            }
        });

        setLoading(false);
    }, [match.params.id]);

    const handleClick = () => {
        ShipmentAPI.finalizeShipment(match.params.id).then((id) => {
            setShipmentId(id);
        });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!!shipmentId) {
        return <Redirect to={`/`} />;
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
            {!validDate ? (
                <Alert severity="error">
                    Flight date cannot be in past by the moment of finalizing
                    shipment.
                </Alert>
            ) : (
                <></>
            )}
            {!validBags ? (
                <Alert severity="error">
                    Bags cannot be empty by the moment of finalizing shipment.
                </Alert>
            ) : (
                <></>
            )}
            {!validParcels ? (
                <Alert severity="error">
                    Parcels cannot be empty by the moment of finalizing
                    shipment.
                </Alert>
            ) : (
                <></>
            )}
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
                    href={`/add/${match.params.id}`}
                    style={{ marginRight: "3.5em" }}
                >
                    Back to edit bags
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    href={`/content/${match.params.id}`}
                    style={{ marginLeft: "3.5em", marginRight: "3.5em" }}
                >
                    Back to edit content
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    style={{ marginLeft: "3.5em" }}
                    disabled={!validDate || !validBags || !validParcels}
                >
                    Finalize shipment
                </Button>
            </div>
        </div>
    );
};

export default FinalizeShipment;
