import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

/* getState can be used to get the full state from the store
We will use this to get the cart data from state and save it in browser's storage.
So that whenever next time user comes back, we can show the last cart state again back to the user
*/
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })
  /*save cart in local browser storage.
  TO convert javascript object to json, we are using Json.stringify
  */
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}