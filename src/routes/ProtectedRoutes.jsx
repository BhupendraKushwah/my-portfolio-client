import { lazy } from 'react'

const Dashboard = lazy(() => import('@/components/super-admin/sections/Dashboard.jsx'));
const AboutMe = lazy(() => import('@/components/super-admin/sections/AboutMe.jsx'));
const Project = lazy(() => import('@/components/super-admin/sections/Project.jsx'));
const ContactMe = lazy(() => import('@/components/super-admin/sections/ContactMe.jsx'));


/**
 * @type {import('react-router').RouteObject[]}
 */

const ProtectedRoutes = [
   { path: "/dashboard", element: <Dashboard /> },
   { path: "/about", element: <AboutMe /> },
   { path: "/project", element: <Project /> },
   { path: "/contact", element: <ContactMe /> },
]

export default ProtectedRoutes;
