import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { useNavigate } from "react-router-dom";

const Option = styled.div`
  width: 40%;
  height: 5rem;
  background-color: ${theme.colorPrimario};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${theme.colorPrimario};
  }
`;

const OptionText = styled.div`
  color: #fff;
  font-size: 1.7rem;
  font-weight: 700;
`;

const Options = ({ titulo, url }) => {
  const navigate = useNavigate();
  return (
    <Option onClick={() => navigate(url)}>
      <OptionText>{titulo}</OptionText>
    </Option>
  );
};

export default Options;
