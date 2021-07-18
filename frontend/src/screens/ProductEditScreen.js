import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import styled from "styled-components";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edytuj Produkt {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <FormDiv>
              <label htmlFor="name">Nazwa</label>
              <input
                type="text"
                id="name"
                placeholder="Wpisz nazwę"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="price">Cena</label>
              <input
                type="text"
                id="price"
                placeholder="Wpisz price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="image">Zdjęcie</label>
              <input
                type="text"
                id="image"
                placeholder="Dodaj image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="imageFile">Dodaj zdjęcie</label>
              <input
                type="file"
                id="imageFile"
                label="Wybierz zdjęcie"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </FormDiv>
            <FormDiv>
              <label htmlFor="category">Kategoria</label>
              <input
                type="text"
                id="category"
                placeholder="Wpisz kategorie"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="brand">Marka</label>
              <input
                type="text"
                id="brand"
                placeholder="Wpisz marke"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="countInStock">Ilość</label>
              <input
                type="text"
                id="countInStock"
                placeholder="Wpisz ilość"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </FormDiv>
            <FormDiv>
              <label htmlFor="description">Opis</label>
              <textarea
                type="text"
                id="description"
                rows="3"
                placeholder="Wpisz opis"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </FormDiv>
            <div>
              <label></label>
              <Button className="primary" type="submit">
                Aktualizuj
              </Button>
            </div>
          </>
        )}
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  form {
    padding: 1rem;
  }
  h1 {
    text-align: center;
  }
`;
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem #a4a4a4 solid;
    font-size: 1.6rem;
    margin-top: 3px;
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