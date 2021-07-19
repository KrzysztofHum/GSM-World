import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import styled from "styled-components";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascipt";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [orderId, dispatch, order, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
    dispatch(detailsOrder(orderId));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Wrapper>
      <h1>Zamówienie {order._id}</h1>
      <div>
        <div>
          <Details>
            <h2>Dostawa</h2>
            <p>
              <strong>Zamawiający:</strong>
              {order.shippingAddress.fullName} <br />
              <strong>Adres:</strong> {order.shippingAddress.address},
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <MessageBox variant="success">
                Dostarczono {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Nie Dostarczono</MessageBox>
            )}
          </Details>
          <Details>
            <h2>Płatność</h2>
            <p>
              <strong>Metoda płatności:</strong>
              {order.paymentMethod}
              {order.isPaid ? (
                <MessageBox variant="success">
                  Zapłacono {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Nie zapłacono</MessageBox>
              )}
            </p>
          </Details>
          <Details>
            <h2>Zamówienie</h2>
            <ul>
              {order.orderItems.map((item) => (
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
        <div>
          <Details>
            <h2>Podsumowanie</h2>
            <DetailsOrder>
              <div>Przedmioty</div>
              <div>{order.itemsPrice.toFixed(2)} zł</div>
            </DetailsOrder>
            <DetailsOrder>
              <div>Dostawa</div>
              <div>{order.shippingPrice.toFixed(2)} zł</div>
            </DetailsOrder>
            <DetailsOrder>
              <div>
                <strong>Cena całkowita</strong>
              </div>
              <div>
                <strong>{order.totalPrice.toFixed(2)} zł</strong>
              </div>
            </DetailsOrder>
            {!order.isPaid && (
              <div>
                {/* {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : ( */}
                {errorPay && (
                  <MessageBox variant="danger">{errorPay}</MessageBox>
                )}
                {loadingPay && <LoadingBox></LoadingBox>}
                <PayPalButton
                  amount={order.totalPrice}
                  onClick={successPaymentHandler}
                ></PayPalButton>
                {/* )} */}
              </div>
            )}
            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div>
                {loadingDeliver && <LoadingBox></LoadingBox>}
                {errorDeliver && (
                  <MessageBox variant="danger">{errorDeliver}</MessageBox>
                )}
                <Button
                  type="button"
                  className="primary block"
                  onClick={deliverHandler}
                >
                  Zamówienie dostarczone
                </Button>
              </div>
            )}
          </Details>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  max-width: 700px;
  margin: 1rem auto;
  h1 {
    font-size: 2rem;
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
    padding: 0.3rem;
  }
  p {
    padding: 1rem;
  }
`;

const DetailsOrder = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  align-items: center;
  div {
    width: 100%;
  }
`;

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
