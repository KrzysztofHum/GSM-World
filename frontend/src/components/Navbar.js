import React, { useEffect } from "react";

import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import { listProductCategories } from "../actions/productActions";
import SearchBox from "./SearchBox";
// import LoadingBox from "./LoadingBox";
// import MessageBox from "./MessageBox";
import styled from "styled-components";
export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  //   const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  //   const productCategoryList = useSelector((state) => state.productCategoryList);
  //   const {
  //     loading: loadingCategories,
  //     error: errorCategories,
  //     categories,
  //   } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <>
      <Header className="row">
        <div>
          {/* <button
            type="button"
            className="open-sidebar"
            onClick={() => setSidebarIsOpen(true)}
          >
            <i className="fa fa-bars"></i>
          </button> */}
          <Linka className="brand" to="/">
            Świat GSM
          </Linka>
        </div>

        <div>
          <Link to="/cart">
            Koszyk
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">Profil Użytkownika</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Historia zamówień</Link>
                </li>
                <Link to="#signout" onClick={signoutHandler}>
                  Wyloguj się
                </Link>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Zaloguj się</Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productlist">Produkty</Link>
                </li>
                <li>
                  <Link to="/orderlist">Zamówienia</Link>
                </li>
                <li>
                  <Link to="/userlist">Użytkownicy</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        </div>
      </Header>
      {/* <aside className={sidebarIsOpen ? "open" : ""} >
        <ul className="categories">
          <li>
            <strong>Kategorie</strong>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className="close-sidebar"
              type="button"
            >
              <i className="fa fa-close"></i>
            </button>
          </li>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            categories.map((c) => {
              <li key={c}>
                <Link
                  to={`/search/category/${c}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {c}
                </Link>
              </li>;
            })
          )}
        </ul>
      </aside> */}
    </>
  );
}

const Linka = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
`;

const Header = styled.header`
padding: 1.5rem;
border-bottom: 1px solid ${({theme}) => theme.colors.border};
div {
	width: 100%auto;
	padding: 3px;
}
`