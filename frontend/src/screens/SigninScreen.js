import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Zaloguj się</h1>
        </div>
		{loading && <LoadingBox></LoadingBox>}
		{error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Adres e-mail</label>
          <input
            type="email"
            id="email"
            placeholder="wpisz e-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Hasło</label>
          <input
            type="password"
            id="password"
            placeholder="wpisz hasło"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Zaloguj się
          </button>
        </div>
        <div>
          <label />
          <div>
            Nowy użytkownik ? {""}
            <Link to={`/register>redirect=${redirect}`}> Stwórz swoje konto</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
