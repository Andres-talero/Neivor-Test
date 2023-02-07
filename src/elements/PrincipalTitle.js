import React from "react";
import styled from "styled-components";
import theme from "./../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top: 1rem;
`;

const Title = styled.p`
  font-size: 3rem;
  color: ${theme.grisClaro2};
  margin-bottom: 3rem;

  @media (max-width: 60rem) {
    font-size: 2rem;
  }
`;

const BackButt = styled.button`
  width: 3rem;
  height: 3rem;
  border: none;
  outline: none;
  background-color: ${theme.rojo};
  border-radius: 0.5rem;
  margin-right: 1rem;
  cursor: pointer;
  color: #fff;
  margin-top: .2rem;

  @media (max-width: 60rem) {
    margin-top: 0;
  }
`;

const PrincipalTitle = ({ title = "", buttonBack = false}) => {
  const navigate = useNavigate();
  return (
    <TitleContainer>
      {buttonBack && <BackButt onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft}/></BackButt>}
      <Title>{title}</Title>
    </TitleContainer>
  );
};

export default PrincipalTitle;
