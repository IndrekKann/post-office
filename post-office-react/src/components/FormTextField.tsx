import React from "react";
import { useField, FieldAttributes } from "formik";
import { TextField } from "@material-ui/core";

const FormTextField: React.FC<FieldAttributes<{}>> = ({
    disabled,
    placeholder,
    ...props
}) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <TextField
            disabled={disabled}
            autoComplete="off"
            placeholder={placeholder}
            {...field}
            helperText={errorText}
            error={!!errorText}
            style={{ width: 286 }}
        />
    );
};

export default FormTextField;
