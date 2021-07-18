import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { detailsUser, UpdateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import styled from "styled-components";

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, userId, props.history, successUpdate]);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UpdateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edutuj użytkownika {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <FormDiv>
              <label htmlFor="name">Nazwa</label>
              <input
                type="text"
                id="name"
                placeholder="potwierdz nazwę"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="potwierdz email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="isSeller">Sprzedawca</label>
              <input
                type="isSeller"
                id="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="isAdmin">Admin</label>
              <input
                type="isAdmin"
                id="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </FormDiv>
            <div>
              <Button type="submit" className="primary">
                Aktualizuj
              </Button>
            </div>
          </>
        )}
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