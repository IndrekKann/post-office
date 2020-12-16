import React from "react";
import { useField, FieldAttributes } from "formik";
import { TextField } from "@material-ui/core";

const FormNumberField: React.FC<FieldAttributes<{}>> = ({
    placeholder,
    ...props
}) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <TextField
            autoComplete="off"
            placeholder={placeholder}
            {...field}
            type="number"
            helperText={errorText}
            error={!!errorText}
            style={{ width: 286 }}
        />
    );
};

export default FormNumberField;
