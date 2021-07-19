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
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Wrapper>
            <div>
              <Img src={product.image} alt={product.name}></Img>
            </div>
            <Content>
              <div>
                <FirstSection>
                  <h1>{product.name}</h1>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </FirstSection>
                <PriceDiv>Cena : {product.price} zł</PriceDiv>
                <StatusDiv>
                  Status:{" "}
                  {product.countInStock > 0 ? (
                    <span style={{ color: "#20a020" }}>Dostępny</span>
                  ) : (
                    <span style={{ color: "#a02020" }}>Niedostępny</span>
                  )}
                </StatusDiv>
              </div>
              {product.countInStock > 0 && (
                <div>
                  <QtyDiv>
                    <div>Liczba sztuk:</div>
                    <div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </QtyDiv>
                  <div>
                    <Button onClick={addToCartHandler}>Dodaj do koszyka</Button>
                  </div>
                </div>
              )}
            </Content>
          </Wrapper>
          <H1>Opis</H1>
          <Desc>
            <div>
              <h1>{product.name}</h1>
              <div>
                <Img src={product.image} alt={product.name}></Img>
              </div>
            </div>
            <div>
              <p>{product.description}</p>
            </div>
          </Desc>
        </div>
      )}
    </>
  );
}

const Wrapper = styled.div`
  border-bottom: 10px solid ${({ theme }) => theme.colors.border};
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2rem;
    justify-content: space-around;
  }
`;

const Content = styled.div`
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Img = styled.img`
  padding-top: 3rem;
  height: 50vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const FirstSection = styled.div`
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
    @media (min-width: 768px) {
      padding: 0.5rem;
      transform: translateY(-6px);
    }
  }
`;

const Button = styled.button`
  display: flex;
  padding: 1rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 2rem;
  margin: 1rem auto;
  @media (min-width: 1200px) {
    font-size: 3rem;
  }
`;

const Desc = styled.div`
  @media (min-width: 768px) {
    display: flex;
    padding: 2rem;
    justify-content: space-around;
  }
`;

const H1 = styled.h1`
padding: 2rem;

`