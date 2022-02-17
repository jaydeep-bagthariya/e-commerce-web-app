import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout'

const CartPage = () => {
  const { cartItems } = useSelector(state => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const totalSum = cartItems.reduce((a, b) => {return a + b.price}, 0);
    setTotalAmount(totalSum);
  },[cartItems])

  const deleteFromCart = (product) => {
    dispatch({type: 'DELETE_FROM_CART', payload: product.id})
  } 

  return (
    <Layout>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product,id) => {
            return (<tr key={id}>
              <td><img src={product.imageURL} height="80" width="80"/></td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td><FaTrash onClick={() => deleteFromCart(product)} style={{cursor: 'pointer'}}/></td>
            </tr>)
          })}
        </tbody>
      </table>
      <div className='d-flex justify-content-end'>
          <h4 className='total-amount'>Total Amount = {totalAmount} RS/-</h4>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <button>PLACE ORDER</button>
      </div>
    </Layout>
  )
}

export default CartPage