import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    props.history.push("/signin?redirec=shipping");
  };

  return (
    <Wrapper>
      <div>
        <h1>Twoje zakupy</h1>
        {cartItems.length === 0 ? (
          <Empty>
            <p> Twój kosztyk jest pusty.</p>

            <EmptyLink to="/">Powrót do sklepu</EmptyLink>
          </Empty>
        ) : (
          <>
            {cartItems.map((item) => (
              <MainSection key={item.product}>
                <div>
                  <Img src={item.image} alt={item.name}></Img>
                </div>
                <div>
                  <LinkToItem>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </LinkToItem>
                  <QtyDiv>
                    <div>Liczba sztuk:</div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </QtyDiv>
                  <Price>Cena za sztukę: {item.price} zł</Price>
                  <RemoveButton>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Usuń
                    </button>
                  </RemoveButton>
                </div>
              </MainSection>
            ))}
            <Summary>
              <h2>Podsumowanie</h2>
              <h3>
                Ilość produktów: {cartItems.reduce((a, c) => a + c.qty, 0)}szt
              </h3>
              <h3>
                Cena za wszystko:{" "}
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                zł
              </h3>
              <button
                type="button"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Kontynuuj zakupy
              </button>
            </Summary>
          </>
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

const Empty = styled.div`
  font-size: 2rem;
  text-align: center;
  padding: 2rem;
  p {
    padding: 1rem;
  }
`;
const EmptyLink = styled(Link)`
  background-color: #e0e0ff;
  border-radius: 1rem;
  margin: auto;
  padding: 0.5rem;
  color: #2020a0;
`;

const Img = styled.img`
  height: 50vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
const LinkToItem = styled.div`
  text-align: center;
  font-size: 3rem;
`;
const QtyDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem;
  font-size: 3rem;
  select {
    padding: 1rem;
    border-radius: 3px;
  }
`;

const Price = styled.div`
  font-size: 2rem;
`;

const RemoveButton = styled.div`
  padding: 1rem;
  button {
    display: flex;
    padding: 1rem 4rem;
    color: white;
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 2rem;
    margin: 1rem auto;
  }
`;

const MainSection = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2rem;
    justify-content: space-around;
  }
`;


const Summary = styled.div`
  border-top: 10px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  h2,
  h3 {
    padding: 1rem;
  }
  button {
    display: flex;
    padding: 1rem;
    color: white;
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 2rem;
    margin: 1rem auto;
  }
`;
