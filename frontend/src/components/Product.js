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
  flex-direction: column;
  padding: 4rem 1rem 2rem 2rem;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  @media (min-width: 550px) {
    padding: 4rem 5rem 2rem 5rem;
    flex-direction: row;
  }
  @media (min-width: 768px) {
    flex-direction: column;
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: calc(100% / 3);
  }
  &:hover {
    background-color: whitesmoke;
  }
  img {
    width: 15rem;
    height: 15rem;
  }
`;

const DescDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2rem;
  font-size: 2.5rem;
`;

const PriceDiv = styled.div`
  justify-content: center;
  font-size: 2.5rem;
`;
