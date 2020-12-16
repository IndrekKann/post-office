import React from "react";
import { Button } from "@material-ui/core";
import "./NotFound.css";

const NotFound: React.FC = () => {
    return (
        <div className="not-found">
            <div>
                <h1>404</h1>
            </div>
            <div>That page does not exist or is unavailable.</div>
            <Button variant="contained" color="primary" href="/">
                Go back to Home
            </Button>
        </div>
    );
};

export default NotFound;
