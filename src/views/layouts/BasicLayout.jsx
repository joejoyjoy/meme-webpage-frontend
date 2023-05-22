import { Suspense, lazy } from "react";
import { Outlet } from 'react-router-dom'
const Navbar = lazy(() => import('../components/navbarComponent/navbarComponent'));

const BasicLayout = () => {
  return (
    <Suspense fallback={<></>}>
      <Navbar />
      <Outlet />
    </Suspense>
  )
}

export default BasicLayout;