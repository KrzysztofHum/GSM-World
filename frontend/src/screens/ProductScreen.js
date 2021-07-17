import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { detailsProduct } from "../actions/productActions";
import styled from "styled-components";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div>
            <Img src={product.image} alt={product.name}></Img>
          </div>
          <MainWrapper>
            <h1>{product.name}</h1>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </MainWrapper>
          <PriceDiv>Cena : {product.price} zł</PriceDiv>
          <StatusDiv>
            Status:{" "}
            {product.countInStock > 0 ? (
              <span style={{ color: "#20a020" }}>Dostępny</span>
            ) : (
              <span style={{ color: "#a02020" }}>Niedostępny</span>
            )}
          </StatusDiv>
          {product.countInStock > 0 && (
            <div>
              <QtyDiv>
                <div>Liczba sztuk:</div>
                <div>
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </QtyDiv>
              <AddToCart>
                <button onClick={addToCartHandler}>Dodaj do koszyka</button>
              </AddToCart>
            </div>
          )}
          <div>
            <h2>Opis</h2>
            <h1>{product.name}</h1>
            <div>
              <Img src={product.image} alt={product.name}></Img>
            </div>
            <div>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Img = styled.img`
  height: 50vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const MainWrapper = styled.div`
  font-size: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
`;

const PriceDiv = styled.div`
  font-size: 4rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
`;

const StatusDiv = styled.div`
  font-size: 3rem;
  padding: 1rem;
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

const AddToCart = styled.div`
  border-bottom: 10px solid ${({ theme }) => theme.colors.border};

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
