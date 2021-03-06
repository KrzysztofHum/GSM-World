import React from "react";
import { useState } from "react";
import styled from "styled-components";

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <Form onSubmit={submitHandler}>
      <DivRow>
        <input
          placeholder=" czego szukasz?"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        />
        <ButtonSort>
          Filtruj
        </ButtonSort>
        <Button type="submit">
          <i className="fa fa-search"></i>
        </Button>
      </DivRow>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
`;

const DivRow = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  max-width: 60rem;
  input {
    border: 1px solid ${({theme}) => theme.colors.border};
    width: 100%;
  }
  `;

const Button = styled.button`
  min-width: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: background-color .5s;
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryhover};
    transition: background-color .5s;
  }
  i {
    color: white;
  }
`;

const ButtonSort = styled.button`
  min-width: 60px;
  background-color: green;
  transition: background-color 0.5s;
  border: none;
  color: white;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryhover};
    transition: background-color 0.5s;
  }

`;