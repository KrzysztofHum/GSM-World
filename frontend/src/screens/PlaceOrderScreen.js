import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { createOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, order, props.history, dispatch]);
  return (
    <Wrapper>
      <div>
        <div>
          <Details>
            <h2>Dostawa</h2>
            <p>
              <strong>Zamawiający: </strong>
              {cart.shippingAddress.fullName} <br />
              <br />
              <strong>Adres dostawy: </strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </p>
          </Details>
          <Details>
            <h2>Płatność</h2>
            <p>
              <strong>Metoda płatności:</strong>
              {cart.paymentMethod}
            </p>
          </Details>
          <Details>
            <h2>Zamówienie</h2>
            <ul>
              {cart.cartItems.map((item) => (
                <li key={item.product}>
                  <DetailsOrder>
                    <div>
                      <Img src={item.image} alt={item.name}></Img>
                    </div>
                    <div>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      {item.qty} x {item.price} zł = {item.qty * item.price} zł
                    </div>
                  </DetailsOrder>
                </li>
              ))}
            </ul>
          </Details>
        </div>

        <Details>
          <h2>Podsumowanie</h2>
          <DetailsOrder>
            <div>Przedmioty:</div>
            <div>{cart.itemsPrice.toFixed(2)} zł</div>
          </DetailsOrder>
          <DetailsOrder>
            <div>Dostawa:</div>
            <div>{cart.shippingPrice.toFixed(2)} zł</div>
          </DetailsOrder>
          <DetailsOrder>
            <div>
              <strong>Cena całkowita:</strong>
            </div>
            <div>
              <strong>{cart.totalPrice.toFixed(2)} zł</strong>
            </div>
          </DetailsOrder>
          <Button
            type="button"
            onClick={placeOrderHandler}
            disabled={cart.cartItems.length === 0}
          >
            Zatwierdź zamówienie
          </Button>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </Details>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  max-width: 700px;
  margin: 1rem auto;
  h1 {
    text-align: center;
  }
`;

const Details = styled.div`
  background-color: #f8f8f8;
  border: 0.1rem solid silver;
  border-radius: 0.5rem;
  margin: 1rem;
  padding: 1rem;
  div {
    padding: .3rem;
  }
  p {
    padding: 1rem;
  }
`;

const DetailsOrder = styled.div`
display: flex;
flex-direction: row;
padding: .5rem;
align-items: center;
div {
  width: 100%;
}
`

const Img = styled.img`
  height: 10vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
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
