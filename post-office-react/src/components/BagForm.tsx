import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import * as yup from "yup";
import FormTextField from "./FormTextField";
import BagParcelRadioButton from "./BagParcelRadioButton";
import ShipmentFinalized from "../components/ShipmentFinalized";
import BagAPI from "../api/BagAPI";
import IBagCreation from "../interfaces/IBagCreation";
import IBagView from "../interfaces/IBagView";
import { Type } from "../interfaces/Type";
import "./BagForm.css";

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

// Convertion because radio button value cannot be nonstring
const convertBagTypeToString = (bags: IBagCreation[]): IBagView[] => {
    const mappedBags: IBagView[] = [];
    bags.forEach((bag) => {
        const mappedBag: IBagView = {
            id: bag.id,
            bagNumber: bag.bagNumber,
            type: Type[bag.type],
        };
        mappedBags.push(mappedBag);
    });
    return mappedBags;
};

const convertBagTypeToEnum = (bags: IBagView[]): IBagCreation[] => {
    const mappedBags: IBagCreation[] = [];
    bags.forEach((bag) => {
        const mappedBag: IBagCreation = {
            id: bag.id,
            bagNumber: bag.bagNumber,
            type: Type[bag.type as keyof typeof Type],
        };
        mappedBags.push(mappedBag);
    });
    return mappedBags;
};

type Props = {
    shipmentId: string;
    shipmentNumber: string;
    isFinalized: boolean;
    bags: IBagCreation[];
};

const BagForm: React.FC<Props> = (props) => {
    const [shipmentId, setShipmentId] = useState("");
    const [bagNumbers, setBagNumbers] = useState([] as string[]);
    const classes = useStyles();

    const validationSchema = yup.object().shape({
        bags: yup.array().of(
            yup.object().shape({
                id: yup.string(),
                bagNumber: yup
                    .string()
                    .required("Bag number is required.")
                    .max(15, "Bag number is too long.")
                    .matches(
                        /^[a-zA-Z0-9]{1,15}$/,
                        "Bag number does not match the required format."
                    )
                    .test(
                        "uniqueBagNumber",
                        "Bag number must be unique.",
                        (value) => {
                            BagAPI.getAllBagNumbers().then((bagNumbers) => {
                                setBagNumbers(bagNumbers);
                            });
                            return !bagNumbers.includes(value!);
                        }
                    ),
                type: yup.string().required("Bag type must be chosen."),
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
        return <Redirect to={`/content/${shipmentId}`} />;
    }

    return (
        <div className={classes.root}>
            <Formik
                enableReinitialize
                initialValues={{
                    shipmentId: props.shipmentId,
                    bags: convertBagTypeToString(props.bags),
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    BagAPI.createBagsForShipment({
                        shipmentId: data.shipmentId,
                        bags: convertBagTypeToEnum(data.bags),
                    }).then((id) => {
                        setShipmentId(id);
                    });
                    setSubmitting(false);
                }}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <FieldArray name="bags">
                            {(arrayHelpers) => (
                                <div>
                                    <div className="add-remove-button">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    id: uuidv4(),
                                                    bagNumber: "",
                                                    type: "",
                                                })
                                            }
                                        >
                                            Add a new bag
                                        </Button>
                                    </div>
                                    <div className="add-bag-forms">
                                        {values.bags.map((bag, index) => {
                                            return (
                                                <div
                                                    key={bag.id}
                                                    className="add-bag-form"
                                                >
                                                    <div>
                                                        <div>Bag number</div>
                                                        <FormTextField
                                                            placeholder="e.g. AAA000AA00AAA00"
                                                            name={`bags.${index}.bagNumber`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div>Bag type</div>
                                                        <BagParcelRadioButton
                                                            name={`bags.${index}.type`}
                                                            type="radio"
                                                            value="Letter"
                                                            label="letter"
                                                        />
                                                        <BagParcelRadioButton
                                                            name={`bags.${index}.type`}
                                                            type="radio"
                                                            value="Parcel"
                                                            label="parcel"
                                                        />
                                                    </div>
                                                    <div className="remove-button">
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
                            )}
                        </FieldArray>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BagForm;
