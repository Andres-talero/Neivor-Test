import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NavbarContainer = styled.div`
  width: 100vw;
  height: 7rem;
  background-color: ${theme.colorPrimario};
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 2rem;
`;

const NavbarText = styled.div`
  color: #fff;
  font-size: 1.7rem;
  font-weight: 700;
`;

const Icono = styled(FontAwesomeIcon)`
    padding-right: 2rem;
    font-size: 1.7rem;
    color: #fff;
    cursor: pointer;
`;

const Navbar = ({ titulo, back }) => {
  const navigate = useNavigate();
  return (
    <NavbarContainer>
      {back && (
        <Icono onClick={() => navigate(-1)} icon={faArrowLeft} />
      )}
      <NavbarText>{titulo}</NavbarText>
    </NavbarContainer>
  );
};

export default Navbar;
