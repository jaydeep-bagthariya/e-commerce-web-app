import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Loader from './Loader'

const Layout = ({children, loading}) => {
  return (
    <div>
      {loading && <Loader/>}
      <Header/>
        <div className='content'>
          {children}
        </div>
      {/* <Footer/> */}
    </div>
  )
}

export default Layout