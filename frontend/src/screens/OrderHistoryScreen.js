import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <Wrapper>
      <h1>Historia zamówień</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  h1 {
    text-align: center;
    padding: 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: block;
  margin: 2px auto;
  @media (min-width: 768px) {
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: calc(100% / 3);
  }
  tbody {
    display: block;
    width: 100%;
    @media (min-width: 768px) {
      display: flex;
      flex-wrap: wrap;
    }
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
    padding-left: 30%;
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
