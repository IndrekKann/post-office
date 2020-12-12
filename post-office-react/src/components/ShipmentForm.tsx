import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Select, MenuItem, Button } from "@material-ui/core";
import * as yup from "yup";
import DatePicker from "../components/DatePicker";
import FormTextField from "./FormTextField";
import axios from "axios";
import "./ShipmentForm.css";

const ShipmentForm: React.FC = () => {
    const [error, setError] = useState("");
    const [shipmentId, setShipmentId] = useState("");

    const validationSchema = yup.object().shape({
        shipmentNumber: yup
            .string()
            .matches(
                /^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{6}$/,
                "Shipment number does not match the required format."
            )
            .required("Shipment number is required.")
            .test("shipmentNumber", error, function () {
                return error !== "";
            }),
        flightNumber: yup
            .string()
            .matches(
                /^\w{2}\d{4}$/,
                "Flight number does not match the required format."
            )
            .required("Flight number is required."),
        flightDate: yup.string(),
    });

    if (!!shipmentId) {
        return <Redirect to={`/shipments/${shipmentId}`} />;
    }

    return (
        <div className="shipment-form">
            <Formik
                initialValues={{
                    shipmentNumber: "",
                    airport: 1,
                    flightNumber: "",
                    flightDate: new Date(),
                    bags: [],
                    isFinalized: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    setError("");
                    axios
                        .post("http://localhost:5000/api/shipments", {
                            shipmentNumber: data.shipmentNumber,
                            airport: data.airport,
                            flightNumber: data.flightNumber,
                            flightDate: data.flightDate,
                            bags: data.bags,
                            isFinalized: data.isFinalized,
                        })
                        .then((response) => {
                            setShipmentId(response.data.id);
                        })
                        .catch((error) => {
                            console.log("Peaks validatsiooni vea andma.");
                            console.log(error);
                            setError("Shipment number must be unique.");
                        });
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <div>Shipment number</div>
                            <FormTextField
                                placeholder="e.g. A1B-2C3D4F"
                                name="shipmentNumber"
                            />
                        </div>
                        <div>
                            <div>Airport</div>
                            <Field
                                name="airport"
                                type="select"
                                as={Select}
                                style={{ width: 280 }}
                            >
                                <MenuItem value={1}>
                                    Tallinn Lennart Meri Airport (TLL)
                                </MenuItem>
                                <MenuItem value={2}>
                                    Riga International Airport (RIX)
                                </MenuItem>
                                <MenuItem value={3}>
                                    Helsinki Airport (HEL)
                                </MenuItem>
                            </Field>
                        </div>
                        <div>
                            <div>Flight number</div>
                            <FormTextField
                                placeholder="e.g. AA1234"
                                name="flightNumber"
                            />
                        </div>
                        <div>
                            <div>Flight date</div>
                            <Field
                                name="flightDate"
                                type="date"
                                as={DatePicker}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                type="submit"
                            >
                                Register a new shipment
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ShipmentForm;
