import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout';
import fireDB from '../fireConfig';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  },[]);

  const getData = async() => {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersList = [];
      result.forEach((doc) => {
        ordersList.push(doc.data());
        setLoading(false);
      });
      setOrders(ordersList);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }   
  }
  return (
    <Layout loading={loading}>
      
          {orders.map(order => {
            return <table className='table mt-3 order'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
            {order.cartItems.map((item, id) => {
              console.log(item);
              return (<tr key={id}>
                <td><img src={item.image} height="80" width="80"/></td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                {/* <td><FaTrash onClick={() => deleteFromCart(item)} style={{cursor: 'pointer'}}/></td> */}
              </tr>)
            })}
            </tbody>
            </table>
          })}
    </Layout>
  )
}

export default OrdersPage