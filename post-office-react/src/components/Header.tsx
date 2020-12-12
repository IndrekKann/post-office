import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            display: "none",
            marginRight: "2em",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
    })
);

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6">
                        <Link
                            to={"/"}
                            style={{ textDecoration: "none", color: "#FFF" }}
                        >
                            Shipments
                        </Link>
                    </Typography>
                    <Typography className={classes.title} variant="h6">
                        <Link
                            to={"/add"}
                            style={{ textDecoration: "none", color: "#FFF" }}
                        >
                            Add a new shipment
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
