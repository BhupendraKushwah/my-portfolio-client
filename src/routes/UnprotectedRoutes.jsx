import { lazy } from 'react'
const Home = lazy(()=>import('@/components/layout/Home'))
const Login = lazy(()=>import('@/components/common/Login'))


/**
 * @type {import('react-router').RouteObject[]}
 */

const UnprotectedRoutes = [
    { path: "/", element:<Home/> },
    { path: "/login", element: <Login /> },
    {path:'*',element:<Home/>}


]

export default UnprotectedRoutes;