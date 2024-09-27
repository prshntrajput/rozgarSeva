import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Header from './Header'

const Layout = () => {
  return (
  <>
    <NavBar/>
    <Header/>
    <div className='mt-10'><Outlet/></div>
    </>
  )
}

export default Layout