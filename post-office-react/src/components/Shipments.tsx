import React, { useState, useEffect } from "react";
import axios from "axios";
import IShipment from "../interfaces/IShipment";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

interface Column {
    id: "shipmentNumber" | "airport" | "flightNumber" | "flightDate";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "shipmentNumber", label: "Shipment number", minWidth: 150 },
    { id: "airport", label: "Airport", minWidth: 100 },
    { id: "flightNumber", label: "Flight number", minWidth: 150 },
    { id: "flightDate", label: "Flight date", minWidth: 150 },
];

interface Data {
    shipmentNumber: string;
    airport: string;
    flightNumber: string;
    flightDate: Date;
}

const useStyles = makeStyles({
    root: {
        width: "40%",
        margin: "2em auto",
        boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    container: {
        maxHeight: "100%",
    },
});

const Shipments: React.FC = () => {
    const initialValues: IShipment[] = [];
    const [loading, setLoading] = useState(true);
    const [shipments, setShipments] = useState(initialValues);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const classes = useStyles();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios
            .get<IShipment[]>("http://localhost:5000/api/shipments")
            .then((response) => {
                setShipments(response.data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shipments
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((shipments) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={shipments.id}
                                    >
                                        {columns.map((column) => {
                                            const value = shipments[column.id];
                                            if (
                                                column.id === "shipmentNumber"
                                            ) {
                                                return (
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.format &&
                                                        typeof value ===
                                                            "number" ? (
                                                            column.format(value)
                                                        ) : (
                                                            <Link
                                                                to={`/shipments/${shipments.id}`}
                                                            >
                                                                {value}
                                                            </Link>
                                                        )}
                                                    </TableCell>
                                                );
                                            } else {
                                                return (
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.format &&
                                                        typeof value ===
                                                            "number"
                                                            ? column.format(
                                                                  value
                                                              )
                                                            : value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={shipments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default Shipments;
