import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <Wrapper key={product._id}>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <DescDiv>
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <PriceDiv>{product.price} zł</PriceDiv>
      </DescDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 4rem 1rem 0 2rem;
  img {
    width: 12rem;
    height: 12rem;
  }
`;

const DescDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
  h2 {
    text-align: center;
  }
`;

const PriceDiv = styled.div`
  justify-content: center;
  align-self: flex-end;
  font-size: 2.5rem;
`;
