import React from "react";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";

import ApplicationLayout from "./views/layouts/Application";
import HomeView from "./views/home";
import PostView from "./views/post";

import "./App.css";


class App extends React.Component {
    render() {
        return (
            <ApplicationLayout>
                <Switch>
                    <Route exact path="/" component={HomeView} />
                    <Route path="/:slug" component={PostView} />
                </Switch>
            </ApplicationLayout>
        );
    }
}

export default App;
