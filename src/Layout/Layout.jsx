import React from 'react'
import { Outlet } from 'react-router-dom'
import Navber from '../Navber/Navber'
export default function Layout() {
  return (
    <div>
        <Navber/>
        <Outlet/>
    </div>
  )
}
