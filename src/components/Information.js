import React, { useState, useEffect } from "react";
import { ContentContainer, Content } from "../elements/PrincipalConteiner";
import PrincipalTitle from "../elements/PrincipalTitle";
import { Helmet } from "react-helmet";
import Navbar from "../elements/Navbar";
import { Form, FormOption, Button } from "../elements/FormElements";
import { Input } from "../elements/Input";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import styled from "styled-components";

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

const Information = () => {
  const navigate = useNavigate();
  const { data, setData } = useData();
  const [toggle, setToggle] = useState(true);
  const [toggle1, setToggle1] = useState(false);
  const [acompañantes, setAcompañantes] = useState("");

  useEffect(() => {
    if (data.length < 2) {
      navigate("/Visit");
    } else if (data.length >= 4) {
      setToggle(data[3].transport);
      setToggle1(data[3].acompañantes);
      setAcompañantes(data[3].numeroAcompañantes);
    }
  }, [data]);

  const disableButton = () => {
    return false;
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "Numero":
        setAcompañantes(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.length >= 4) {
      const newData = data.map((item, index) => {
        if (index === 3) {
          return {
            transport: toggle,
            acompañantes: toggle1,
            numeroAcompañantes: acompañantes === "" ? null : acompañantes,
          };
        }
        return item;
      });
      setData(newData);
    } else {
      setData([
        ...data,
        {
          transport: toggle,
          acompañantes: toggle1,
          numeroAcompañantes: acompañantes === "" ? null : acompañantes,
        },
      ]);
    }
    navigate("/Visit/Qr");
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
          {data.length > 0 ? (
            <Form onSubmit={handleSubmit}>
              <FormOption big>
                <Input
                  type="number"
                  name="DNI"
                  value={data[0].dni}
                  placeholder="999 999 999"
                  disabled={true}
                />
              </FormOption>
              {data[1].vehiculo ? (
                <>
                  <ToggleContainer>
                    <label htmlFor="cheese-status">Vehiculo</label>
                    <Toggle
                      id="cheese-status"
                      checked={toggle}
                      onChange={() => setToggle(!toggle)}
                    />
                  </ToggleContainer>
                  {toggle ? (
                    <FormOption big>
                      <Input
                        type="text"
                        name="Matricula"
                        value={data[2].matricula}
                        disabled={true}
                      />
                    </FormOption>
                  ) : null}
                </>
              ) : null}
              <>
                <ToggleContainer>
                  <label htmlFor="cheese-status">Acompañantes</label>
                  <Toggle
                    id="cheese-status"
                    checked={toggle1}
                    onChange={() => setToggle1(!toggle1)}
                  />
                </ToggleContainer>
                {toggle1 ? (
                  <FormOption big>
                    <Input
                      type="number"
                      name="Numero"
                      value={acompañantes}
                      change={handleChange}
                      placeholder="0"
                    />
                  </FormOption>
                ) : null}
              </>
              <Button primario type="submit" disabled={disableButton()}>
                Siguiente
              </Button>
            </Form>
          ) : null}
        </Content>
      </ContentContainer>
    </>
  );
};

export default Information;
