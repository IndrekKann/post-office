import React from "react";
import { RouteComponentProps } from "react-router";
import { Button } from "@material-ui/core";
import BagsList from "../components/BagsList";

interface Props extends RouteComponentProps<{ id: string }> {}

const Bags: React.FC<Props> = ({ match, history, location }) => {
    return (
        <div>
            <BagsList match={match} history={history} location={location} />
            <div
                style={{
                    margin: "2em auto",
                    textAlign: "center",
                    display: "table",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    href={`/add/${match.params.id}`}
                    style={{ marginRight: "3.5em" }}
                >
                    Edit bags
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    href={`/content/${match.params.id}`}
                    style={{ marginRight: "3.5em", marginLeft: "3.5em" }}
                >
                    Edit content
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    href={`/finalize/${match.params.id}`}
                    style={{ marginLeft: "3.5em" }}
                >
                    Finalize shipment
                </Button>
            </div>
        </div>
    );
};

export default Bags;
