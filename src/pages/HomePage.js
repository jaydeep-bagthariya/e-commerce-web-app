import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from '../fireConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Products } from './all-products';

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cartReducer);

  useEffect(() => {
    getData();
  },[]);

  const getData = async() => {
    try {
      setLoading(true);
      const products = await getDocs(collection(fireDB, "products"));
      const productsList = [];
      products.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        }
        productsList.push(obj);
        setLoading(false);
      });

      setProducts(productsList);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }   
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  },[cartItems])

  const addToCart = (product) => {
    dispatch({type: 'ADD_TO_CART', payload: product})
  }

  // const clickHandler = async() => {
  //   Products.map(async(product) => {
  //     try {
  //       await addDoc(collection(fireDB, "products"), product);
  //       console.log("Yeah Added");
  //     } catch(err) {
  //       console.log(err);
  //     }
  //   })
  // }
  return (
    <Layout loading={loading}>
      <div className='container'>
        <div className='d-flex w-50 my-3'>
          <input type="text" className='form-control mx-2' placeholder='search items' value={searchKey} onChange={(e) => setSearchKey(e.target.value) }/>
          <select className='form-control' value={filterType} onChange={(e) => setFilterType(e.target.value) }>
            <option value="">All</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electonics</option>
            <option value="jewelery">Jewelery</option>
          </select>
          {/* <button onClick={clickHandler}>Add Items</button> */}
        </div>
        <div className='row'>
          {products
          .filter(obj => obj.title.toLowerCase().includes(searchKey.toLowerCase()))
          .filter(obj => obj.category.includes(filterType))
          .map((product, ind) => {
            return <div className='col-md-4' key = {ind}>
              <div className='m-2 p-1 product position-relative'>
                <div className='product-content'>
                  <p>{product.title}</p>
                  <div className='text-center'>
                    <img src={product.image} alt="Product Image" className='product-img'/>
                  </div>
                </div>
                <div className='product-actions'>
                  <h2>{product.price} RS/-</h2>
                  <div className='d-flex'>
                    <button className='mx-2' onClick={() => addToCart(product)}>ADD TO CART</button>
                    <button className='mx-2' onClick={() => navigate(`/productInfo/${product.id}`)}>VIEW</button>
                  </div>
                </div>
              </div>
            </div>
          } )}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage