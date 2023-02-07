import React, { useState, useEffect } from "react";
import { ContentContainer, Content } from "../elements/PrincipalConteiner";
import PrincipalTitle from "../elements/PrincipalTitle";
import { Helmet } from "react-helmet";
import Navbar from "../elements/Navbar";
import { Form, FormOption, Button } from "../elements/FormElements";
import { Input } from "../elements/Input";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faBicycle,
  faMotorcycle,
} from "@fortawesome/free-solid-svg-icons";

const TransportContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  margin: 0 1rem;
  overflow: auto;

  @media (min-width: 60rem) {
    width: 50%;
  }
`;

const Transports = styled(FontAwesomeIcon)`
  font-size: 3rem;
  background-color: ${(props) =>
    props.color === "true" ? "lightGreen" : "#fff"};
  width: 100%;
  height: 5rem;
  padding: 1rem;
  color: #000;
  border: 1px solid
    ${(props) => (props.color === "true" ? "lightGreen" : "#000")};
  border-radius: 1rem;
  margin: 2rem 1rem;
  cursor: pointer;
`;

const Transport = () => {
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [color, setColor] = useState(false);
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);
  const navigate = useNavigate();
  const { data, setData } = useData();

  useEffect(() => {
    if (data.length < 2) {
      navigate("/Visit");
    } else if (data.length >= 3) {
      setDni(data[2].matricula);
      if (data[2].transport === "Carro") {
        setColor(true);
      } else if (data[2].transport === "Bicicleta") {
        setColor1(true);
      }
      if (data[2].transport === "Moto") {
        setColor2(true);
      }
    }
    if (data.length >= 4) {
      if (!data[3].transport) {
        navigate("/VisitMoreData");
      }
    }
  }, [data]);

  const disableButton = () => {
    if (dni === "") {
      return true;
    } else {
      if (color === true || color1 === true || color2 === true) {
        return false;
      } else {
        return true;
      }
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "Nombre y apellido":
        setNombre(e.target.value);
        break;
      case "Matricula":
        setDni(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleTransport = (toggle) => {
    switch (toggle) {
      case 1:
        setColor(true);
        setColor1(false);
        setColor2(false);
        break;
      case 2:
        setColor(false);
        setColor1(true);
        setColor2(false);
        break;
      case 3:
        setColor(false);
        setColor1(false);
        setColor2(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.length >= 3) {
      const newData = data.map((item, index) => {
        if (index === 2) {
          return {
            transport: color ? "Carro" : color1 ? "Bicicleta" : "Moto",
            matricula: dni,
          };
        }
        return item;
      });
      setData(newData);
    } else {
      setData([
        ...data,
        {
          transport: color ? "Carro" : color1 ? "Bicicleta" : "Moto",
          matricula: dni,
        },
      ]);
    }
    setNombre("");
    setDni("");
    navigate("/Visit/Information");
  };

  return (
    <>
      <Helmet>
        <title>Registrar Visita</title>
      </Helmet>
      <Navbar titulo="Neivor - Visita" back={true} />
      <ContentContainer>
        <Content>
          <PrincipalTitle title="¿Que vehiculo usas?" />
          <Form onSubmit={handleSubmit}>
            <TransportContainer>
              <Transports
                color={color.toString()}
                onClick={() => handleTransport(1)}
                icon={faCar}
              />
              <Transports
                color={color1.toString()}
                onClick={() => handleTransport(2)}
                icon={faBicycle}
              />
              <Transports
                color={color2.toString()}
                onClick={() => handleTransport(3)}
                icon={faMotorcycle}
              />
            </TransportContainer>
            <FormOption>
              <Input
                type="number"
                name="Matricula"
                value={dni}
                change={handleChange}
                placeholder="999 999 999"
              />
            </FormOption>
            <Button primario type="submit" disabled={disableButton()}>
              Siguiente
            </Button>
          </Form>
        </Content>
      </ContentContainer>
    </>
  );
};

export default Transport;
