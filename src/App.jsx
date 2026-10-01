import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './Home/Home'
import About from './About/About'
import Blog from './Blog/Blog'
import Layout from './Layout/Layout'
import NotFound from './NotFound/NotFound'
import Category from './Category/Category'
import Laptot from './Laptot/Laptot'
import Mobile from './mobile/mobile'
import BlogDetails from './BlogDetails/BlogDetails'

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
  children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'blog/:id', // حطيناه فوق خالص عشان الـ Router يلقطه أول ما يشوف /blog/ رقم
        element: <BlogDetails />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'About',
        element: <About />
      },
      {
        path: 'Category',
        element: <Category />,
        children: [
          {
            path: 'Laptot',
            element: <Laptot />
          },
          {
            path: 'mobile',
            element: <Mobile />
          }
        ]
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={routers} />
}