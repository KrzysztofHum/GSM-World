import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { detailsUser, UpdateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Hasła nie sa takie same");
    } else {
      dispatch(UpdateUserProfile({ userId: user._id, name, email, password }));
    }
  };
  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <div>
          <h1>Profil Użytkownika</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profil został zaktualizowany
              </MessageBox>
            )}
            <FormDiv>
              <label htmlFor="name">Imie</label>
              <input
                type="text"
                id="name"
                placeholder="Wpisz Imię"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Wpisz email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                id="password"
                placeholder="Wpisz hasło"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="ConfirmPassword">Potwierdź hasło</label>
              <input
                type="ConfirmPassword"
                id="password"
                placeholder="Potwierdź hasło"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormDiv>
            <div>
              <label />
              <Button type="submit">
                Zaktualizuj
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