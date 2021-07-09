import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert("Hasła nie są identyczne");
    } else {

      dispatch(register(name, email, password));
    }
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
          <h1>Stwórz konto</h1>
        </div>
		{loading && <LoadingBox></LoadingBox>}
		{error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Nazwa użytkownika</label>
          <input
            type="text"
            id="name"
            placeholder="wpisz nazwę"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
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
          <label htmlFor="confirmPassword">Powtórz Hasło</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="wpisz hasło"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Stwórz konto
          </button>
        </div>
        <div>
          <label />
          <div>
           Posiadasz już konto ? {""}
            <Link to={`/signin>redirect=${redirect}`}> Zaloguj się</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
