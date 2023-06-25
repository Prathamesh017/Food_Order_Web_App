import React, { useEffect, useState } from "react";
import { DataContext } from "../Context/Context.jsx";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import "./Cart.css";

function Cart() {
  const { state, dispatch } = DataContext();
  const [cartitems, setCartItems] = useState(state.cart);
  const [finaltotal, setFinalTotal] = useState(0);
  const [order, orderplaced] = useState(false);

  useEffect(() => {
    setCartItems(state.cart);
    calculateTotal();
  }, [cartitems, state]);

  function calculateTotal() {
    let total = 0;
    state.cart.map((i) => {
      return (total += i.totalprice);
    });

    setFinalTotal(total);
  }
  const addChanges = ({ item, op }) => {
    if (op === "INCR") {
      dispatch({ type: "Add_To_Cart", payload: item });
    } else {
      dispatch({ type: "Delete_From_Cart", payload: item });
    }
  };
  const orderConfirm = () => {
    setTimeout(() => {
      orderplaced(true);
    }, 3000);

    setTimeout(() => {
      orderplaced(false);
    }, 8000);
  };
  return (
    <div className="cart-items">
      <h1 className="cart-items-title">My Orders</h1>
      <h2 className="cart-items-subtitle">My Cart</h2>
      {cartitems.length ? (
        <div className="product-cart">
          <CartHeader></CartHeader>
          {cartitems.map((item) => {
            return (
              <div className="cart-item">
                <p className="item-title">{item.title}</p>
                <p>{item.price}</p>
                <div className="buttons">
                  <button
                    className="addDelBtn"
                    onClick={() => addChanges({ item, op: "DECR" })}
                  >
                    -
                  </button>
                  <p>{item.qty}</p>
                  <button
                    className="addDelBtn"
                    onClick={() => addChanges({ item, op: "INCR" })}
                  >
                    +
                  </button>
                </div>
                <p>{item.totalprice}</p>
              </div>
            );
          })}
          <div className="total">
            <p>Total</p>
            <p>{finaltotal}</p>
          </div>
          <div className="endBtns">
            <Link to="/">
              <button className="goBackBtn">Go back</button>
            </Link>
            <button className="finalOrderBtn" onClick={orderConfirm}>
              Confirm Order
            </button>
          </div>
          {order && (
            <Alert
              severity="success"
              sx={{ fontSize: "2rem", marginTop: "2px" }}
            >
              Succesful order placed
            </Alert>
          )}
        </div>
      ) : (
        <>
          <p className="no-item-show">No item to Show</p>
          <Link to="/">
            <button className="goBackBtn">Go back</button>
          </Link>
        </>
      )}
    </div>
  );
}

function CartHeader() {
  return (
    <div className="cartHeader">
      <p className="product-title">Product</p>
      <p className="">Price</p>
      <p className="">Quality</p>
      <p className="">Total</p>
    </div>
  );
}

export default Cart;
