import { Outlet } from 'react-router-dom'
import NavbarComponent from "../components/navbarComponent/NavbarComponent";

const BasicLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  )
}

export default BasicLayout;