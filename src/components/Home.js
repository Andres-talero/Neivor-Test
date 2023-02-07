import React from "react";
import { ContentContainer, Content } from "../elements/PrincipalConteiner";
import { Helmet } from "react-helmet";
import Navbar from "../elements/Navbar";
import Options from "../elements/Options";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Opciones</title>
      </Helmet>
      <Navbar titulo="Neivor" />
      <ContentContainer>
        <Content>
          <Options titulo="Registrar Visita" url="/Visit" />
        </Content>
      </ContentContainer>
    </>
  );
};

export default Home;
