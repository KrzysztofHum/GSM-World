import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { savePaymentMethod } from "../actions/cartActions";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <div>
          <h1>Płatność</h1>
        </div>
        <div>
          <input
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            required
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="paypal">PayPal</label>
        </div>
        <div>
          <input
            type="radio"
            id="przelewy24"
            value="przelewy24"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="przelewy24">Przelewy24</label>
        </div>
        <div>
          <Button type="submit">Kontynuj</Button>
        </div>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  h1 {
    text-align: center;
  }
  div {
    font-size: 2rem;
    padding: 1rem;
  }
  input {
    margin: 1rem;
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
