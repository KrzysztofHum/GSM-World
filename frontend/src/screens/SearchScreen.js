import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { prices, ratings } from "../utils";
import Rating from "../components/Rating";
import styled from "styled-components";

export default function SearchScreen(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "",
  } = useParams();
  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, name, min, max, rating, order]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;

    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };

  return (
    <Wrapper>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <h3>Wynik wyszukiwania: {products.length} </h3>
        )}
        <Sorting>
          <div>Sortowanie: </div>
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Najnowsze produkty</option>
            <option value="lowest">Najtańsze produkty</option>
            <option value="highest">Najdroższe produkty</option>
            <option value="toprated">Najlepiej oceniane produkty</option>
          </select>
        </Sorting>
      </div>
      <div>
        <FiltrSection>
          <Filtration>
            <h3>Kategorie </h3>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link to={getFilterUrl({ category: "all" })}>wszystkie</Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link to={getFilterUrl({ category: c })}>{c}</Link>
                  </li>
                ))}
              </ul>
            )}
          </Filtration>
          <Filtration>
            <h3>Cena</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link to={getFilterUrl({ min: p.min, max: p.max })}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Filtration>
          <Filtration>
            <h3>Ocena konsumentów</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link to={getFilterUrl({ rating: r.rating })}>
                    <Rating
                      caption={" & więcej"}
                      rating={r.rating}
                      numReviews={""}
                    ></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </Filtration>
        </FiltrSection>
        <div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>Produkt nie znaleziony</MessageBox>
              )}
              <Products>
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </Products>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  h3 {
    padding: 1rem;
    text-align: center;
  }
`;
const Sorting = styled.div`
  font-size: 2rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  select {
    margin-top: 0.5rem;
    padding: 0.5rem;
  }
`;

const FiltrSection = styled.div`
@media (min-width: 1200px) {
  display: flex;
  flex-wrap: wrap;
}
`

const Filtration = styled.div`
  padding: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  @media (min-width: 1200px) {
    width: calc(100%/3);
  }
  ul li {
    padding: 0.5rem;
    margin: 0.5rem auto;
    font-size: 2rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 3px;
    max-width: 50rem;
  }
`;

const Products = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
`;