import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker: React.FC = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date()
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="date-picker-inline"
                value={selectedDate}
                style={{ width: 286 }}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    "aria-label": "change date",
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;
