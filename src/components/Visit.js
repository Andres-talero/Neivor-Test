import React, { useState, useEffect } from "react";
import { ContentContainer, Content } from "../elements/PrincipalConteiner";
import PrincipalTitle from "../elements/PrincipalTitle";
import { Helmet } from "react-helmet";
import Navbar from "../elements/Navbar";
import { Form, FormOption, Button } from "../elements/FormElements";
import { Input } from "../elements/Input";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";

const Visit = () => {
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const navigate = useNavigate();
  const { data, setData } = useData();

  //UseEffect si data tiene un elemento, entonces setea los valores de nombre y dni
  useEffect(() => {
    if (data.length >= 1) {
      setNombre(data[0].nombre);
      setDni(data[0].dni);
    }
  }, [data]);

  const disableButton = () => {
    if (nombre === "" || dni === "") {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "Nombre y apellido":
        setNombre(e.target.value.replace(/[0-9]+/g, ""));
        break;
      case "DNI":
        setDni(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.length >= 1) {
      const newData = data.map((item, index) => {
        if (index === 0) {
          return {
            nombre: nombre,
            dni: dni,
          };
        }
        return item;
      });
      setData(newData);
    } else {
      setData([
        {
          nombre: nombre,
          dni: dni,
        },
      ]);
    }
    setNombre("");
    setDni("");
    navigate("/VisitMoreData", { data: data });
  };

  return (
    <>
      <Helmet>
        <title>Registrar Visita</title>
      </Helmet>
      <Navbar titulo="Neivor - Visita" back={true} />
      <ContentContainer>
        <Content>
          <PrincipalTitle title="Datos de la visita" />
          <Form onSubmit={handleSubmit}>
            <FormOption>
              <Input
                type="text"
                name="Nombre y apellido"
                value={nombre}
                change={handleChange}
                placeholder="Carlos Villa"
              />
            </FormOption>
            <FormOption>
              <Input
                type="number"
                name="DNI"
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

export default Visit;
