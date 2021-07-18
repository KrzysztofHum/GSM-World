import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteOrder, listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm("Napewno chcesz usunąć zamówienie ?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <Wrapper>
      <div>
        <h1>Zamówienia</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Użytkownik</th>
                <th>Data</th>
                <th>Cena całkowita</th>
                <th>Płatność</th>
                <th>Dostawa</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td data-label="ID">{order._id}</td>
                  <td data-label="Użytkownik">{order.user.name}</td>
                  <td data-label="Data">{order.createdAt.substring(0, 10)}</td>
                  <td data-label="Cena całkowita">
                    {order.totalPrice.toFixed(2)}
                  </td>
                  <td data-label="Płatność">
                    {order.isPaid ? order.paidAt.substring(0, 10) : "Nie"}
                  </td>
                  <td data-label="Dostawa">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "Nie"}
                  </td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Szczegóły
                    </Button>
                    <Button type="button" onClick={() => deleteHandler(order)}>
                      Usuń
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  h1 {
    text-align: center;
    padding: 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: block;
  tbody {
    display: block;
    width: 100%;
    tr:nth-child(even) {
      background-color: #f5f5f5;
    }
    tr td:last-child {
      display: flex;
      margin: auto;
      padding: 0;
    }
  }
  thead {
    display: none;
  }
  th {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 16px;
    background-color: darkblue;
    color: #ffffff;
  }
  td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 16px;
    display: block;
    width: 100%;
    text-align: right;
    padding-left: 25%;
    position: relative;
    &:before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 40%;
      padding-left: 15px;
      font-size: 15px;
      font-weight: bold;
      text-align: left;
    }
  }
  tr {
    display: block;
    width: 100%;
    margin-bottom: 15px;
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
