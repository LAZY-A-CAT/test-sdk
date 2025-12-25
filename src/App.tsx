import React, { memo, useState } from "react";
import "./App.scss";
import { Button } from "antd";
import Login from "./view/Login";

const App = memo(() => {
  return (
    <div className="App">
      <Login />
    </div>
  );
});

export default App;
