import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import LoadingSpinner from "../components/LoadingSpinner";
import BagAPI from "../api/BagAPI";
import IBag from "../interfaces/IBag";
import { Type } from "../interfaces/Type";

interface Column {
    id: "bagNumber" | "type" | "letterCount" | "price" | "weight";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "bagNumber", label: "Bag number", minWidth: 112.5 },
    { id: "type", label: "Bag type", minWidth: 100 },
    { id: "letterCount", label: "Amount of contents", minWidth: 112.5 },
    { id: "price", label: "Price", minWidth: 112.5 },
    { id: "weight", label: "Weight", minWidth: 112.5 },
];

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

interface Props extends RouteComponentProps<{ id: string }> {}

const BagsList: React.FC<Props> = ({ match }) => {
    const initialValues: IBag[] = [];
    const [loading, setLoading] = useState(true);
    const [bags, setBags] = useState(initialValues);
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
        BagAPI.getAllForShipment(match.params.id).then((bags) => {
            setBags(bags);
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
                        {bags
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((bags) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={bags.id}
                                    >
                                        {columns.map((column) => {
                                            const value = bags[column.id];
                                            if (
                                                column.id === "type" &&
                                                typeof value === "number"
                                            ) {
                                                return (
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {Type[value]}
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
                count={bags.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default BagsList;
