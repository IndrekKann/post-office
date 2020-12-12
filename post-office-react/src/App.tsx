import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AddShipment from "./pages/AddShipment";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/add" exact component={AddShipment} />
                <Route path="/shipments/:id" exact component={Home} />
                <Route path="/" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
