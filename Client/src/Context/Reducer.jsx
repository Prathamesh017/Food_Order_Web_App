export const Reducer = (state, action) => {
  switch (action.type) {
    case "Fill_Cards": {
      console.log(action.payload);
      console.log("type");
      return { ...state, menu: [...action.payload] };
    }
    case "Order_Placed": {
      const alreadyExist = state.cart.find((c) => c.id === action.payload.id);
      if (alreadyExist) {
        alreadyExist.qty += 1;
        alreadyExist.totalprice = alreadyExist.price * alreadyExist.qty;
        return { ...state };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, qty: 1, totalprice: action.payload.price },
        ],
      };
    }

    case "Add_To_Cart": {
      const add = state.cart.find((item) => {
        return item.id === action.payload.id;
      });
      add.qty = add.qty + 1;
      add.totalprice = add.price * add.qty;

      return { ...state };
    }
    case "Delete_From_Cart": {
      const add = state.cart.find((item) => {
        return item.id === action.payload.id;
      });

      if (add.qty === 1) {
        console.log("under 0");
        add.qty = add.qty - 1;
        return { ...state, cart: state.cart.filter((c) => c.id !== add.id) };
      } else {
        add.qty = add.qty - 1;
        add.totalprice = add.price * add.qty;
        return { ...state };
      }
    }
    default:
      return state;
  }
};
