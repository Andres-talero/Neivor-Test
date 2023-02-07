import React, { useState, useEffect } from "react";
import { ContentContainer, Content } from "../elements/PrincipalConteiner";
import PrincipalTitle from "../elements/PrincipalTitle";
import { Helmet } from "react-helmet";
import Navbar from "../elements/Navbar";
import { Form, FormOption, Button } from "../elements/FormElements";
import { Input } from "../elements/Input";
import { useData } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const Picker = styled(DatePicker)`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid darkgray;
  font-size: 1.2rem;
  border-radius: 1rem;

  @media (max-width: 60rem) {
    height: 60px;
  }
`;

const Texto = styled.p`
  font-size: 1.2rem;
  margin-bottom: 5px;
  margin-left: 4px;
`;

const ToggleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 2rem 2rem;

  label {
    font-size: 1.2rem;
  }

  @media (min-width: 60rem) {
    padding: 2rem 1rem;
  }
`;

const VisitMoreData = () => {
  const { data, setData } = useData();
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const navigate = useNavigate();

    //UseEffect si data tiene un elemento, entonces sete el nombre y el dni con los datos del objeto
    useEffect(() => {
      if (data.length === 0) {
        navigate("/Visit");
      } 
      else if (data.length >= 2) {
        setNombre(data[1].TipoVisita);
        setStartDate(new Date(data[1].FechaInicio));
        setEndDate(new Date(data[1].FechaFin));
        setToggle(data[1].FechaFin !== null ? true : false);
        if(data.length >= 4){
          setToggle2(data[3].transport);
        } else {
          setToggle2(data[1].vehiculo);
        }
      }
    }, [data]);

  const disableButton = () => {
    if (nombre === "") {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "Tipo de visita":
        setNombre(e.target.value);
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

    //si el array tiene 2 objetos o mas, editar el 2º objeto y añadirle los datos de esta pagina
    if (data.length >= 2) {
      const newData = data.map((item, index) => {
        if (index === 1) {
          return {
            TipoVisita: nombre,
            FechaInicio: startDate,
            FechaFin: toggle ? endDate : null,
            vehiculo: toggle2,
          };
        }
        if (index === 3) {
          return {
            acompañantes: data[3].acompañantes,
            numeroAcompañantes: data[3].numeroAcompañantes,
            transport: toggle2,
          };
        }
        return item;
      });
      setData(newData);
    } else {
      setData([
        ...data,
        {
          TipoVisita: nombre,
          FechaInicio: startDate,
          FechaFin: toggle ? endDate : null,
          vehiculo: toggle2,
        },
      ]);
    }
    setNombre("");
    setDni("");
    setStartDate(new Date());
    setToggle(false);
    setToggle2(false);
    toggle2 ? navigate("/Visit/Transport") : navigate("/Visit/Information");
  };

  return (
    <>
      <Helmet>
        <title>Registrar Visita</title>
      </Helmet>
      <Navbar titulo="Neivor - Visita" back={true} />
      <ContentContainer>
        <Content>
          <PrincipalTitle title="Algunos datos más" />
          <Form onSubmit={handleSubmit}>
            <ToggleContainer>
              <label htmlFor="cheese-status">Visita de varios días</label>
              <Toggle
                id="cheese-status"
                checked={toggle}
                onChange={() => setToggle(!toggle)}
              />
            </ToggleContainer>
            <FormOption big={!toggle}>
              <Texto>Día de inicio</Texto>
              <Picker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </FormOption>
            {toggle ? (
              <FormOption>
                <Texto>Día de fin</Texto>
                <Picker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </FormOption>
            ) : null}
            <FormOption big>
              <Input
                type="text"
                name="Tipo de visita"
                value={nombre}
                change={handleChange}
                placeholder="Social"
              />
            </FormOption>
            <ToggleContainer>
              <label htmlFor="cheese-status">¿Vienes en coche?</label>
              <Toggle
                id="cheese-status"
                checked={toggle2}
                onChange={() => setToggle2(!toggle2)}
              />
            </ToggleContainer>
            <Button primario type="submit" disabled={disableButton()}>
              Siguiente
            </Button>
          </Form>
        </Content>
      </ContentContainer>
    </>
  );
};

export default VisitMoreData;
