import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingAddressScreen(props) {
	const userSignin = useSelector(state => state.userSignin);
	const {userInfo} = userSignin;
	const cart = useSelector(state => state.cart);
	const {shippingAddress} = cart;
	if(!userInfo) {
		props.history.push('/signin');
	}
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Adres wysyłki</h1>
        </div>
        <div>
          <label htmlFor="fullName">Imię</label>
          <input
            type="text"
            id="fullName"
            placeholder="Zatwierdz nazwe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Adres</label>
          <input
            type="text"
            id="address"
            placeholder="Zatwierdz adres"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">Miejscowość</label>
          <input
            type="text"
            id="city"
            placeholder="Zatwierdz miejscowość"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Kod pocztowy</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Zatwierdz kod-pocztowy"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Kraj</label>
          <input
            type="text"
            id="country"
            placeholder="Zatwierdz kraj"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Kontynuj
          </button>
        </div>
      </form>
    </div>
  );
}
