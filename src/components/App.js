import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Container } from "./../elements/PrincipalConteiner";
import Visit from "./Visit";
import VisitMoreData from "./VisitMoreData";
import { DataProvider } from "./../contexts/DataContext";
import Transport from "./Transport";
import Information from "./Information";
import Qr from "./Qr";

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Visit" element={<Visit />} />
            <Route path="/VisitMoreData" element={<VisitMoreData />} />
            <Route path="/Visit/Transport" element={<Transport />} />
            <Route path="/Visit/Information" element={<Information />} />
            <Route path="Visit/Qr" element={<Qr />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
