import React from "react";
import { useField, FieldAttributes } from "formik";
import { Radio, FormControlLabel } from "@material-ui/core";

type BagParcelRadioButtonProps = { label: string } & FieldAttributes<{}>;

const BagParcelRadioButton: React.FC<BagParcelRadioButtonProps> = ({
    label,
    ...props
}) => {
    const [field] = useField<{}>(props);
    return (
        <FormControlLabel
            {...field}
            control={<Radio color="primary" />}
            label={label}
        />
    );
};

export default BagParcelRadioButton;
