import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { doc, getDoc } from "firebase/firestore";
import fireDB from '../fireConfig';
import { useParams } from 'react-router-dom';

const ProductInfo = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const params = useParams();
  useEffect(() => {
    getData();
  },[]);

  const getData = async() => {
    try {
      setLoading(true);
      const selectedProduct = await getDoc(doc(fireDB, "products", params.productId));
      setProduct(selectedProduct.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }   
  }

  return (
    <Layout loading={loading}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            {product && (<div>
              <p><b>{product.title}</b></p>
              <img src={product.image} alt="product image" className='product-info-img'/>
              <hr />
              <p>{product.description}</p>
              <div className='d-flex justify-content-end my-3'>
                <button>ADD TO CART</button>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductInfo