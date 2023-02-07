import React, { useState, useEffect } from "react";
import { ContentContainer, Content } from "../elements/PrincipalConteiner";
import PrincipalTitle from "../elements/PrincipalTitle";
import { Helmet } from "react-helmet";
import Navbar from "../elements/Navbar";
import { Form, FormOption, Button } from "../elements/FormElements";
import { Input } from "../elements/Input";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import QRCode from "react-qr-code";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import whatsapp from "../images/whatsapp.png";

const QrContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: auto !important;
  padding: 3rem;

  @media (min-width: 30rem) {
    width: 25rem;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto !important;
  text-align: center;
  font-size: 1.2rem;
`;

const ShareContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25rem;
  height: auto !important;
  padding: 3rem;

  @media (max-width: 30rem) {
    width: 80%;
  }
`;

const Image = styled.img`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

const Icono = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const Qr = () => {
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const navigate = useNavigate();
  const { data, setData } = useData();
  const id = uuidv4();

  useEffect(() => {
      if (data.length === 0 || data.length < 2) {
        navigate("/Visit");
      }
  }, []);

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

  const downloadQRCode = () => {
    //Guardar svg del qr
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.setAttribute("href", dataURL);
      link.setAttribute("download", "qr.png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    };

  };

  const sendImage = () => {
    //Enviar svg del qr por whatsapp
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      //Enviar imagen
      window.open(
        `https://api.whatsapp.com/send?phone=5491130000000&text=Hola,%20te%20envio%20el%20codigo%20de%20acceso%20para%20el%20condominio%20Neivor%20%20-%20Nombre:%20${data[0].nombre}%20-%20DNI:%20${data[0].dni}%20-%20Codigo:%20${id}`
      );
    };
  };

  const sendMail = () => {
    //Enviar svg del qr por mail
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      //Enviar imagen
      window.open(
        `mailto:
        anpch@example.com?subject=Hola%20te%20envio%20el%20codigo%20de%20acceso%20para%20el%20condominio%20Neivor%20%20-%20Nombre:%20${data[0].nombre}%20-%20DNI:%20${data[0].dni}%20-%2
        0Codigo:%20${id}&body=Hola,%20te%20envio%20el%20codigo%20de%20acceso%20para%20el%20condominio%20Neivor%20%20-%20Nombre:%20${data[0].nombre}%20-%20DNI:%20${data[0].dni}%20-%20Codigo:%20${id}`
      );
    };
  };

  return (
    <>
      <Helmet>
        <title>Registrar Visita</title>
      </Helmet>
      <Navbar titulo="Neivor - Visita" back={true} />
      <ContentContainer>
        <Content>
          {data.length > 0 && (
            <>
              <PrincipalTitle title={`!${data[0].nombre} ya está listo!`} />
              <Text>
                Necesitará este código para poder ingresar al condominio,
                recuerda enviarlo
              </Text>
              <QrContainer>
                <QRCode
                  id="qr-code"
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={id}
                  viewBox={`0 0 256 256`}
                />
              </QrContainer>
              <ShareContainer>
                <Icono
                  icon={faDownload}
                  size="3x"
                  onClick={() => downloadQRCode()}
                />
                <Image src={whatsapp} onClick={() => sendImage()} alt="whatsapp" />
                <Icono icon={faEnvelope} onClick={() => sendMail()} size="3x" />
              </ShareContainer>
            </>
          )}
        </Content>
      </ContentContainer>
    </>
  );
};

export default Qr;
