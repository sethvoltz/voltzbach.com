import * as React from "react";
import * as ReactDOM from "react-dom";

var Promise = require("promise-polyfill")

// Declare interface to assign Promise to the window
declare global {
  interface Window { Promise: any; }
}

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

import '../assets/index.scss';

import { App } from "./components/App";

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
