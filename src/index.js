import React from "react";
import ReactDOM from "react-dom";

import ToDoListe from "./ToDoListe";

const rootElement = document.getElementById("root");
ReactDOM.render(
  // <React.StrictMode>
  //   <ToDoListe />
  // </React.StrictMode>,
  <ToDoListe />,
  rootElement
);
