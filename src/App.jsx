import React, { Fragment } from "react";
import "./App.css";
import AppRouter from "./configs/router/AppRouter";
import { Toast } from "./components";

const App = () => {
  return (
    <Fragment>
      <Toast />
      <AppRouter />
    </Fragment>
  );
};

export default App;
