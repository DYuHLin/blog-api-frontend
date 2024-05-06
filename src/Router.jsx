import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import RootLayout from './Pages/Layout/RootLayout'
import Create from './Pages/create'
import Detail from './Pages/Detail'
import Delete from './Pages/Delete'
import Update from './Pages/Update'
import Home from './Pages/Home'
import UserBlogs from './Pages/UserBlogs'
import UserContext from './UserContext'

function Router() {

    const { user, ProtectedRoutes } = useContext(UserContext);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/posts' element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path='/posts/login' element={<Login />} />
                <Route path='/posts/register' element={<Register />} />

                <Route element = {<ProtectedRoutes />}>
                    <Route path='/posts/userblogs' element={<UserBlogs />} />
                    <Route path='/posts/create' element={<Create />} />
                    <Route path='/posts/:id/update' element={<Update />} />
                    <Route path='/posts/:id/delete' element={<Delete />} />
                </Route>
                
                <Route path='/posts/:id' element={<Detail />} />
            </Route>
        )
)

  return <RouterProvider router = {router} />
}

export default Router