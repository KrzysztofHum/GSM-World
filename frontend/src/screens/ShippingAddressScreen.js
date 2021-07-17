import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { saveShippingAddress } from "../actions/cartActions";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <div>
          <h1>Adres wysyłki</h1>
        </div>
        <FormDiv>
          <label htmlFor="fullName">Imię:</label>
          <input
            type="text"
            id="fullName"
            placeholder="Zatwierdz nazwe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </FormDiv>
        <FormDiv>
          <label htmlFor="address">Adres:</label>
          <input
            type="text"
            id="address"
            placeholder="Zatwierdz adres"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </FormDiv>
        <FormDiv>
          <label htmlFor="city">Miejscowość:</label>
          <input
            type="text"
            id="city"
            placeholder="Zatwierdz miejscowość"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </FormDiv>
        <FormDiv>
          <label htmlFor="postalCode">Kod pocztowy:</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Zatwierdz kod-pocztowy"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </FormDiv>
        <FormDiv>
          <label htmlFor="country">Kraj:</label>
          <input
            type="text"
            id="country"
            placeholder="Zatwierdz kraj"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </FormDiv>
        <div>
          <label />
          <Button type="submit">Kontynuj</Button>
        </div>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  form {
    padding: 1rem;
  }
  h1 {
    text-align: center;
  }
`;
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem #a4a4a4 solid;
    font-size: 1.6rem;
    margin-top: 3px;
  }
`;

const Button = styled.button`

    display: flex;
    padding: 1rem 4rem;
    color: white;
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 2rem;
    margin: 1rem auto;

`;