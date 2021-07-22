import React from "react";
import styled from "styled-components";

export default function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <RatingWrapper>
      <RatingDiv>
        <span>
          <i
            className={
              rating >= 1
                ? "fa fa-star"
                : rating >= 0.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 2
                ? "fa fa-star"
                : rating >= 1.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 3
                ? "fa fa-star"
                : rating >= 2.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 4
                ? "fa fa-star"
                : rating >= 3.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 5
                ? "fa fa-star"
                : rating >= 4.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
        </span>
      </RatingDiv>
      <Caption>
        {caption ? <span>{caption}</span> : <span>{numReviews + " ocen"}</span>}
        <span> {numReviews + " opinii"}</span>
      </Caption>
    </RatingWrapper>
  );
}

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RatingDiv = styled.div`
  color: #f0c040;
  margin: 0.1rem;
`;

const Caption = styled.div``;
