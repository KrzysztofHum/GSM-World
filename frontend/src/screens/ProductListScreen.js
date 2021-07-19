import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({}));
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm("Na pewno chcesz usunac przedmiot ?")) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <Wrapper>
      <div>
        <h1>Produkty</h1>
        <Button type="button" onClick={createHandler}>
          Stwórz produkt
        </Button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nawa</th>
              <th>Cena</th>
              <th>Kategoria</th>
              <th>Marka</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td data-label="ID">{product._id}</td>
                <td data-label="Nazwa">{product.name}</td>
                <td data-label="Cena">{product.price}</td>
                <td data-label="Kategoria">{product.category}</td>
                <td data-label="Marka">{product.brand}</td>
                <td>
                  <Button
                    type="button"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edytuj
                  </Button>
                  <Button type="button" onClick={() => deleteHandler(product)}>
                    Usuń
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem auto;
  max-width: 40rem;
  h1 {
    text-align: center;
    padding: 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: block;
  tbody {
    display: block;
    width: 100%;
    tr:nth-child(even) {
      background-color: #f5f5f5;
    }
    tr td:last-child {
      display: flex;
      margin: auto;
      padding: 0;
    }
  }
  thead {
    display: none;
  }
  th {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 16px;
    background-color: darkblue;
    color: #ffffff;
  }
  td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 16px;
    display: block;
    width: 100%;
    text-align: right;
    padding-left: 25%;
    position: relative;
    &:before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 40%;
      padding-left: 15px;
      font-size: 15px;
      font-weight: bold;
      text-align: left;
    }
  }
  tr {
    display: block;
    width: 100%;
    margin-bottom: 15px;
  }
`;

const Button = styled.button`
  display: flex;
  padding: 1rem 4rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 2rem;
  margin: 1rem auto;
`;
