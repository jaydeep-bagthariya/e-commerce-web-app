import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { addDoc, collection } from 'firebase/firestore';
import fireDB from '../fireConfig';
import { toast } from 'react-toastify'

const CartPage = () => {
  const { cartItems } = useSelector(state => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const placeOrder = async() => {
    setShow(false);

    const addressInfo = {
      name, 
      address,
      pincode,
      phoneNumber,
    }
    console.log(addressInfo);

    const orderInfo = {
      cartItems, 
      addressInfo,
      email : JSON.parse(localStorage.getItem('e-commerce-user')).user.email,
      userId : JSON.parse(localStorage.getItem('e-commerce-user')).user.uid,
    }

    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo)
      toast.success("Order Placed Successfully");
      setLoading(false);
      handleClose();
    } catch (error) {
      toast.error("Order Failed");
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const totalSum = cartItems.reduce((a, b) => {return a + b.price}, 0);
    setTotalAmount(totalSum);
  },[cartItems])

  const deleteFromCart = (product) => {
    dispatch({type: 'DELETE_FROM_CART', payload: product.id})
  } 

  return (
    <Layout loading={loading}>
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
              <td><img src={product.image} height="80" width="80"/></td>
              <td>{product.title}</td>
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
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='register-form'>
            <h2>Register</h2>
            <hr />
            <input type='text' className='form-control' placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
            <input type='number' className='form-control' placeholder='pincode' value={pincode} onChange={(e) => setPincode(e.target.value)}/>
            <input type='number' className='form-control' placeholder='phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <input type='textarea' className='form-control' placeholder='address' value={address} onChange={(e) => setAddress(e.target.value)}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={placeOrder}>
            Order
          </button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default CartPage