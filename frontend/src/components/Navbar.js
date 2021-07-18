import React, { useEffect, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import { listProductCategories } from "../actions/productActions";
import SearchBox from "./SearchBox";

import styled from "styled-components";
export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <>
      <Header onClick={() => (dropdown ? setDropdown(false) : "")}>
        <div>
          <Linka to="/">Świat GSM</Linka>
        </div>

        <Wrapper>
          {userInfo ? (
            <>
              <Link onClick={() => setDropdown(!dropdown)} to="#">
                <FaRegUser size="35" />
              </Link>
              <Dropdown dropdown={dropdown}>
                <li>
                  <LinkLi to="/profile">Profil Użytkownika</LinkLi>
                </li>
                <li>
                  <LinkLi to="/orderhistory">Historia zamówień</LinkLi>
                </li>
                {userInfo && userInfo.isAdmin && (
                  <>
                    <li>
                      <LinkLi to="/dashboard">Dashboard</LinkLi>
                    </li>
                    <li>
                      <LinkLi to="/productlist">Produkty</LinkLi>
                    </li>
                    <li>
                      <LinkLi to="/orderlist">Zamówienia</LinkLi>
                    </li>
                    <li>
                      <LinkLi to="/userlist">Użytkownicy</LinkLi>
                    </li>
                  </>
                )}
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Wyloguj się
                  </Link>
                </li>
              </Dropdown>
            </>
          ) : (
            <LinkLi to="/signin">Zaloguj się</LinkLi>
          )}
          <Link to="/cart">
            <CgShoppingCart size="40" />
            {cartItems.length > 0 && <Badge>{cartItems.length}</Badge>}
          </Link>
        </Wrapper>
        <div>
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        </div>
      </Header>
    </>
  );
}

const Linka = styled(Link)`
  margin-left: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Header = styled.header`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  div {
    width: 100%auto;
    padding: 3px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 2rem;
  margin-right: 2rem;
`;
const Dropdown = styled.ul`
  position: absolute;
  right: 0;
  width: 25rem;
  z-index: 1;
  margin: 4rem 4rem 0 0;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: ${(props) => (props.dropdown ? "block" : "none")};
  li {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: 1.5rem;
  }
`;

const LinkLi = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.colors.fonthover};
  }
`;
const Badge = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  padding: 0.2rem 0.7rem;
  font-size: 1.4rem;
  margin-left: 0.2rem;
`;
