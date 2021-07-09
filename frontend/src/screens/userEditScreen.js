import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { detailsUser, UpdateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

export default function userEditScreen(props) {
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
    <div>
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
            <div>
              <label htmlFor="name">Nazwa</label>
              <input
                type="text"
                id="name"
                placeholder="potwierdz nazwę"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="potwierdz email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="isSeller">Sprzedawca</label>
              <input
                type="isSeller"
                id="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="isAdmin">Admin</label>
              <input
                type="isAdmin"
                id="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div>
              <button type="submit" className="primary">
                Aktualizuj
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
