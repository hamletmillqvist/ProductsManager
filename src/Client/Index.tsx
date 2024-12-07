import * as React from "react";
import App from "./App";
import {createRoot} from "react-dom/client";

const element = document.getElementById("root");
const root = createRoot(element!);
root.render(<App/>);