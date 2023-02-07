import styled from "styled-components";
import theme from "./../theme";

const Form = styled.form`
  width: 80%;
  height: auto;
  padding: 0 3rem; /* 40px */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: 60rem) {
    width: 100%;
    padding: 0 2rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2.5rem 0; /* 40px */
`;

const Button = styled.button`
  width: 80%;
  position: absolute;
  bottom: 4%;
  background: ${(props) =>
    props.primario
      ? theme.colorPrimario
      : props.danger
      ? "#C0392B"
      : props.secundario
      ? "#0097FF"
      : props.danger
      ? "#a21824'"
      : "orange"};
  border: none;
  border-radius: 5px;
  padding: 2rem;
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin: 0 0.5rem;
  &:hover {
    background: ${(props) =>
      props.primario
        ? theme.colorPrimario
        : props.danger
        ? "#C0392B"
        : props.secundario
        ? "#0097FF"
        : props.danger
        ? "#a21824'"
        : "orange"};
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  @media (max-width: 60rem) {
    font-size: 1.3rem;
  }
`;

const ButtonBack = styled(Button)`
  background-color: #fff;
  border: 2px solid orange;
  border-radius: 5px;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: orange;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: orange;
    color: #fff;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  @media (max-width: 60rem) {
    font-size: 1.3rem;
  }
`;

const FormOption = styled.div`
  width: ${(props) => (props.big ? "100%" : "50%")};
  padding: 0 0.5rem;
  margin: .6rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 60rem) {
    width: 100%;
    padding: 0 2rem;
  }
`;

export { Form, FormOption, ButtonContainer, Button, ButtonBack };
