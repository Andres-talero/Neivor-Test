import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";

const Index = () => {
  return (
    <>
      <App />
    </>
  );
};

export default Index;

const root = createRoot(document.getElementById("root"));
root.render(<Index />);
