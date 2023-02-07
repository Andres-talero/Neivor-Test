import React from "react";
import styled from "styled-components";
import theme from "./../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ContainerInput = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.disabled ? "#f2f2f2" : "#fff")};
  border-radius: 1rem;
  margin: 0.5rem 0;
  position: relative;
  overflow: hidden;
  border: ${(props) => (props.disabled ? "1px solid #f2f2f2" : "1px solid darkgray")};

  &:focus-within {
    background-color: #e8e8e8;

    span {
      background-color: #e8e8e8;
    }
  }

  &:focus-within {
    label {
      background-color: #e8e8e8;
    }
  }

  &:focus-within,
  :not(placeholder-shown) {
    .labelp {
      transform: translatey(-0.5rem);
      font-size: 0.8rem;
    }
  }
`;

const InputElement = styled.input`
  width: 100%;
  height: 5rem;
  font-size: 1.3rem; /* 40px */
  border: none;
  outline: none;
  padding: 2rem 0.8rem;
  padding-left: 0.9rem;
  background-color: transparent;
  color: #000;

  //Si es type file poner opacity 0
  &[type="file"] {
    position: relative;
    cursor: pointer;
    //before con imagen
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 85%;
      padding-top: 0.5rem;
      padding-left: 1rem;
      border-radius: 1rem;
      z-index: 30;
    }
    &:after {
      content: "";
      position: absolute;
      background-color: transparent;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 8;

      @media (max-width: 60rem) {
        width: 100%;
        right: 0.2rem;
      }
    }
  }

  :not(:placeholder-shown) {
    & + .btnp {
      display: flex;
    }

    & + .labelp {
      background-color: red !important;
      font-size: 5rem;
    }
  }

  &::placeholder {
    left: 1rem;
  }

  @media (max-width: 60rem) {
    font-size: 1.4rem;
    width: 100%;
  }
`;

const TextareaElement = styled.textarea`
  width: 100%;
  height: ${(props) => (props.size === "big" ? "8rem" : "4rem")};
  font-size: 1.3rem; /* 40px */
  border: none;
  outline: none;
  padding: 0.8rem;
  padding-top: 1.3rem;
  padding-left: 0.9rem;
  background-color: transparent;
  color: #000;
  display: flex;
  align-items: center;
  resize: none;

  &::placeholder {
    position: absolute;
    left: 1rem;

    @media (max-width: 30rem) {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 60rem) {
    font-size: 1.4rem;
    width: 100%;
  }
`;

const Label = styled.label`
  width: 100%;
  display: block;
  font-size: 1.2rem !important;
  padding-left: 0.4rem;
  color: ${theme.grisClaro2};
`;

const Span = styled.span`
  width: 100%;
  height: 3.5rem;
  position: absolute;
  top: 1.5rem;
  left: 0;
  padding-left: 1rem;
  padding-top: 0.7rem;
  bottom: 1rem;
  z-index: 10;
  overflow: hidden;
  background-color: #f2f2f2;

  @media (max-width: 30rem) {
    font-size: 0.8rem;
  }
`;

const ButtonPassword = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 2rem;
  right: 0.7rem;
  z-index: 20;
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
  outline: none;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  border-radius: 20%;
  font-size: 1.2rem;
  color: ${theme.grisClaro2};
`;

const Input = ({
  name,
  type,
  placeholder,
  value,
  disabled = false,
  change,
  filename,
  password = false,
  setPassword,
}) => {
  return (
    <>
      <Label className="labelp" disabled={disabled}>
        {name}
      </Label>
      <ContainerInput disabled={disabled}>
        <InputElement
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={change}
          autocomplete="off"
          required="required"
          disabled={disabled}
        />
        {setPassword && (
          <ButtonPassword
            className="btnp"
            onClick={() => {
              setPassword(!password);
            }}
          >
            <FontAwesomeIcon icon={password ? faEyeSlash : faEye} />
          </ButtonPassword>
        )}
        {filename && <Span>{filename}</Span>}
      </ContainerInput>
    </>
  );
};

const TexTarea = ({ name, type, placeholder, value, change, size }) => {
  return (
    <ContainerInput>
      <Label className="labelp">{name}</Label>
      <TextareaElement
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={change}
        autocomplete="false"
        required="required"
        size={size}
      />
    </ContainerInput>
  );
};

export { Input, TexTarea };
