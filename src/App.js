import './App.css';
import HomePage from './pages/HomePage';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrerPage from './pages/RegistrerPage';
import ProductInfo from './pages/ProductInfo';
import CartPage from './pages/CartPage';

import './stylesheets/layout.css';
import './stylesheets/products.css';
import './stylesheets/authentication.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegistrerPage />} />
          <Route path="/productInfo/:productId" exact element={<ProtectedRoutes><ProductInfo /></ProtectedRoutes>} />
          <Route path="/cart" exact element={<ProtectedRoutes><CartPage /></ProtectedRoutes>} />
          <Route path='/orders' exact element={<ProtectedRoutes><OrdersPage/> </ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({children}) => {
  if(localStorage.getItem('e-commerce-user')) {
    return children;
  }
  else {
    return <Navigate to="/login" />
  }
}
