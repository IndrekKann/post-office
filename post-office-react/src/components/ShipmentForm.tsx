import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Select, MenuItem, Button } from "@material-ui/core";
import * as yup from "yup";
import FormTextField from "./FormTextField";
import ShipmentAPI from "../api/ShipmentAPI";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import "./Form.css";
import { Airport } from "../interfaces/Airport";

const ShipmentForm: React.FC = () => {
    const [shipmentId, setShipmentId] = useState("");

    const validationSchema = yup.object().shape({
        shipmentNumber: yup
            .string()
            .matches(
                /^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{6}$/,
                "Shipment number does not match the required format."
            )
            .required("Shipment number is required."),
        flightNumber: yup
            .string()
            .matches(
                /^\w{2}\d{4}$/,
                "Flight number does not match the required format."
            )
            .required("Flight number is required."),
        flightDate: yup.date().required(),
    });

    if (!!shipmentId) {
        return <Redirect to={`/add/${shipmentId}`} />;
    }

    return (
        <div className="shipment-form">
            <Formik
                initialValues={{
                    shipmentNumber: "",
                    airport: Airport.TLL,
                    flightNumber: "",
                    flightDate: new Date(),
                    bags: [],
                    isFinalized: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    ShipmentAPI.createShipment({
                        shipmentNumber: data.shipmentNumber,
                        airport: data.airport,
                        flightNumber: data.flightNumber,
                        flightDate: data.flightDate,
                        bags: [],
                        isFinalized: false,
                    }).then((id) => {
                        setShipmentId(id);
                    });
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, values, setFieldValue }) => (
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
                                <MenuItem value={0}>
                                    Tallinn Lennart Meri Airport (TLL)
                                </MenuItem>
                                <MenuItem value={1}>
                                    Riga International Airport (RIX)
                                </MenuItem>
                                <MenuItem value={2}>
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
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    id="date-picker-inline"
                                    value={values.flightDate}
                                    style={{ width: 286 }}
                                    onChange={(flightDate) => {
                                        setFieldValue("flightDate", flightDate);
                                    }}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </MuiPickersUtilsProvider>
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
