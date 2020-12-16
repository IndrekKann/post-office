import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Shipments from "./pages/Shipments";
import Bags from "./pages/Bags";
import NotFound from "./pages/NotFound";
import AddShipment from "./pages/AddShipment";
import AddBagsToShipment from "./pages/AddBagsToShipment";
import AddContentToBags from "./pages/AddContentToBags";
import FinalizeShipment from "./pages/FinalizeShipment";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact component={Shipments} />
                <Route path="/add" exact component={AddShipment} />
                <Route path="/add/:id" exact component={AddBagsToShipment} />
                <Route path="/content/:id" exact component={AddContentToBags} />
                <Route
                    path="/finalize/:id"
                    exact
                    component={FinalizeShipment}
                />
                <Route path="/shipments/:id" exact component={Bags} />
                <Route path="/" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
