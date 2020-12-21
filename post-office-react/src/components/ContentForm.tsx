import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import * as yup from "yup";
import FormTextField from "./FormTextField";
import FormNumberField from "./FormNumberField";
import "./Form.css";
import ShipmentFinalized from "../components/ShipmentFinalized";
import IBag from "../interfaces/IBag";
import { Type } from "../interfaces/Type";
import IParcel from "../interfaces/IParcel";
import "./ContentForm.css";
import BagContentAPI from "../api/BagContentAPI";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
        },
    })
);

type Props = {
    shipmentId: string;
    shipmentNumber: string;
    isFinalized: boolean;
    bags: IBag[];
    parcels: IParcel[];
};

const ContentForm: React.FC<Props> = (props) => {
    const [shipmentId, setShipmentId] = useState("");
    const [parcelNumbers, setParcelNumbers] = useState([] as string[]);
    const classes = useStyles();

    const validationSchema = yup.object().shape({
        bags: yup.array().of(
            yup.object().shape({
                letterCount: yup
                    .string()
                    .matches(/^\d+$/, "Count of letters must be an integer.")
                    .required("Count of letters is required."),
                weight: yup
                    .string()
                    .matches(
                        /^\d+[.,]?\d{0,3}$/,
                        "Max 3 decimals allowed after comma."
                    )
                    .required("Weight is required."),
                price: yup
                    .string()
                    .matches(
                        /^\d+[.,]?\d{0,2}$/,
                        "Max 2 decimals allowed after comma."
                    )
                    .required("Price is required."),
            })
        ),
        parcels: yup.array().of(
            yup.object().shape({
                id: yup.string(),
                parcelNumber: yup
                    .string()
                    .matches(
                        /^\w{2}\d{6}\w{2}$/,
                        "Parcel number does not match the required format."
                    )
                    .required("Parcel number is required.")
                    .test(
                        "uniqueParcelNumber",
                        "Parcel number must be unique.",
                        (value) => {
                            BagContentAPI.getAllParcelNumbers().then(
                                (parcelNumber) => {
                                    setParcelNumbers(parcelNumber);
                                }
                            );
                            return !parcelNumbers.includes(value!);
                        }
                    ),
                recipientName: yup
                    .string()
                    .required("Recipient name is required."),
                destinationCountry: yup
                    .string()
                    .matches(
                        /^\w{2}$/,
                        "Destination country code must be 2 letters."
                    )
                    .required("Destination country is required."),
                weight: yup
                    .string()
                    .matches(
                        /^\d+[.,]?\d{0,3}$/,
                        "Max 3 decimals allowed after comma."
                    )
                    .required("Weight is required."),
                price: yup
                    .string()
                    .matches(
                        /^\d+[.,]?\d{0,2}$/,
                        "Max 2 decimals allowed after comma."
                    )
                    .required("Price is required."),
            })
        ),
    });

    if (props.isFinalized) {
        return (
            <ShipmentFinalized
                shipmentId={props.shipmentId}
                shipmentNumber={props.shipmentNumber}
            />
        );
    }

    if (!!shipmentId) {
        return <Redirect to={`/finalize/${shipmentId}`} />;
    }

    return (
        <div className={classes.root}>
            <Formik
                enableReinitialize
                initialValues={{
                    shipmentId: props.shipmentId,
                    bags: props.bags,
                    parcels: props.parcels,
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    BagContentAPI.createContentForBags({
                        shipmentId: data.shipmentId,
                        bags: data.bags,
                        parcels: data.parcels,
                    }).then((id) => {
                        setShipmentId(id);
                    });
                    setSubmitting(false);
                }}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <div>
                            <div className="forms">
                                {values.bags.map((bag, index) => {
                                    if (bag.type === Type.Letter) {
                                        return (
                                            <div
                                                key={bag.id}
                                                className="letter-form form"
                                            >
                                                <h3>
                                                    Bag number: {bag.bagNumber}
                                                </h3>
                                                <h3>Type: {Type[bag.type]}</h3>
                                                <div>
                                                    <div>Count of letters</div>
                                                    <FormNumberField
                                                        name={`bags.${index}.letterCount`}
                                                    />
                                                </div>
                                                <div>
                                                    <div>
                                                        Weight (in kilograms)
                                                    </div>
                                                    <FormNumberField
                                                        name={`bags.${index}.weight`}
                                                    />
                                                </div>
                                                <div>
                                                    <div>Price (in euros)</div>
                                                    <FormNumberField
                                                        name={`bags.${index}.price`}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    } else if (bag.type === Type.Parcel) {
                                        return (
                                            <div
                                                key={bag.id}
                                                className="parcel-form form"
                                            >
                                                <h3>
                                                    Bag number: {bag.bagNumber}
                                                </h3>
                                                <h3>Type: {Type[bag.type]}</h3>
                                                <FieldArray name="parcels">
                                                    {(arrayHelpers) => (
                                                        <div>
                                                            <div>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={() =>
                                                                        arrayHelpers.push(
                                                                            {
                                                                                id: uuidv4(),
                                                                                bagId:
                                                                                    bag.id,
                                                                                parcelNumber:
                                                                                    "",
                                                                                recipientName:
                                                                                    "",
                                                                                destinationCountry:
                                                                                    "",
                                                                                weight: 0,
                                                                                price: 0,
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    Add a new
                                                                    parcel
                                                                </Button>
                                                            </div>
                                                            <div>
                                                                {values.parcels.map(
                                                                    (
                                                                        parcel,
                                                                        index
                                                                    ) => {
                                                                        if (
                                                                            parcel.bagId ===
                                                                            bag.id!
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        parcel.id
                                                                                    }
                                                                                >
                                                                                    <div>
                                                                                        <div>
                                                                                            Parcel
                                                                                            number
                                                                                        </div>
                                                                                        <FormTextField
                                                                                            placeholder="e.g. AA123456AA"
                                                                                            name={`parcels.${index}.parcelNumber`}
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <div>
                                                                                            Recipient
                                                                                            name
                                                                                        </div>
                                                                                        <FormTextField
                                                                                            placeholder="e.g. John Smith"
                                                                                            name={`parcels.${index}.recipientName`}
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <div>
                                                                                            Destination
                                                                                            country
                                                                                            (2
                                                                                            letter
                                                                                            code)
                                                                                        </div>
                                                                                        <FormTextField
                                                                                            placeholder="e.g. EE"
                                                                                            name={`parcels.${index}.destinationCountry`}
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <div>
                                                                                            Weight
                                                                                        </div>
                                                                                        <FormNumberField
                                                                                            name={`parcels.${index}.weight`}
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <div>
                                                                                            Price
                                                                                        </div>
                                                                                        <FormNumberField
                                                                                            name={`parcels.${index}.price`}
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            color="secondary"
                                                                                            onClick={() =>
                                                                                                arrayHelpers.remove(
                                                                                                    index
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            Remove
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        } else {
                                                                            return null;
                                                                        }
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            </div>
                                        );
                                    } else {
                                        return <></>;
                                    }
                                })}
                            </div>

                            <div className="add-remove-button">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContentForm;
