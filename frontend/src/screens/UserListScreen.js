import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userConstants";

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({type: USER_DETAILS_RESET})
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm("Czy jesteś pewien ?")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <Wrapper>
      <h1>Użytkownicy</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Użytkownik usunięty</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa</th>
              <th>Email</th>
              <th>Sprzedawca</th>
              <th>Admin</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td data-label="ID">{user._id}</td>
                <td data-label="Nazwa">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Sprzedawca">{user.isSeller ? "TAK" : "NIE"}</td>
                <td data-label="Admin">{user.isAdmin ? "TAK" : "NIE"}</td>
                <td>
                  <Button
                    type="button"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Edytuj
                  </Button>
                  <Button type="button" onClick={() => deleteHandler(user)}>
                    Usuń
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
