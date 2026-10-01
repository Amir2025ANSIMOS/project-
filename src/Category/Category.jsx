import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Category() {
  return (
    <div className='container'>
      <div className='row'>

        <div className='col-md-3'>
          <ul>
            <li>
              <Link to={'/Category/Laptot'}>
                Laptot
              </Link>
            </li>

            <li>
              <Link to={'/Category/mobile'}>
                mobile
              </Link>
            </li>
          </ul>
        </div>

        <div className='col-md-9'>
          <p className='text-danger text-4xl'>
            Category
          </p>

          <Outlet />
        </div>

      </div>
    </div>
  )
}
